import { simpleParser } from 'mailparser';
import Imap from 'imap-simple';
import { MongoClient } from 'mongodb';
import { flattenDeep } from 'lodash';

const clientPromise = new MongoClient(process.env.MONGODB_URI).connect();

const getParts = (parts) => {
    return flattenDeep(parts.map(part => {
        if (part.parts) {
            return getParts(part.parts);
        }
        return part;
    }));
};

const checkForEmails = async ({ user, password, host, port }) => {
    const imapConfig = {
        imap: {
            user: user,
            password: password,
            host: host,
            port: port,
            tls: true,
            tlsOptions: { rejectUnauthorized: false , servername:host },
            authTimeout: 10000
        }
    };

    try {
        // Connecting  to IMAP
        const connection = await Imap.connect(imapConfig);
        await connection.openBox('INBOX');

        // we will only check for unseen messages
        const searchCriteria = ['UNSEEN'];
        const fetchOptions = {
            bodies: ['HEADER', 'TEXT', ''],
            struct: true, 
            markSeen: true 
        };

        const results = await connection.search(searchCriteria, fetchOptions);


        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db();
        const receivedCollection = db.collection('receivedEmails');
        const sentCollection = db.collection('sentEmails');

        // Fetch sent emails for reference matching
        const sentEmails = await sentCollection.find().toArray();

        for (const item of results) {
       

            // Extract email headers
            const headerPart = item.parts.find(part => part.which === 'HEADER');
            const headers = headerPart ? headerPart.body : {};
            const subject = headers.subject ? headers.subject[0] : 'No subject';
            const from = headers.from ? headers.from[0] : 'Unknown sender';
            const matches = from.match(/^(.+) <(.+)>$/);
            const name = matches ? matches[1] : from;
            const email = matches ? matches[2] : '';

            console.log(`Email subject: ${subject}`);

           
            const matchingSentEmail = sentEmails.find(sentEmail => sentEmail.recipient === email);
            if (!matchingSentEmail) {
                console.log(`Email from ${from} not found in sent emails. Skipping.`);
                continue;
            }

            const referenceCodes = sentEmails.map(sentEmail => sentEmail.referenceCode);
            const foundReference = referenceCodes.some(code => {
                const regex = new RegExp(`\\[${code}\\]`, 'i');
                return regex.test(subject);
            });

            if (!foundReference) {
                console.log(`Email subject does not contain any reference code from sent emails. Skipping.`);
                continue;
            }


            const bodyPart = item.parts.find(part => part.which === 'TEXT');
            const mail = await simpleParser(bodyPart.body);

            const bodyLines = mail.text ? mail.text.split('\n') : [];
            const body = bodyLines.length > 0 ? bodyLines[0] : 'No body';

      
            const emailDocument = {
                from : from,
                name : name,
                email : email,
                subject : subject,
                body : body,
                date: mail.date || new Date(),
                attachments: []
            };

            // Extract attachments
            // const parts = getParts(item.attributes.struct);
            // const attachmentPromises = parts.filter(part => part.disposition && part.disposition.type.toUpperCase() === 'ATTACHMENT')
            //     .map(part => connection.getPartData(item, part)
            //         .then(partData => ({
            //             filename: part.disposition.params.filename,
            //             data: partData
            //         })));

            // emailDocument.attachments = await Promise.all(attachmentPromises);

            // Insert the email into the receivedEmails collection
            await receivedCollection.insertOne(emailDocument);
        }

        // Closing connection 
        connection.end();
    } catch (error) {
        console.error('Error checking emails:', error);
        throw error;
    }
};

export default checkForEmails;


