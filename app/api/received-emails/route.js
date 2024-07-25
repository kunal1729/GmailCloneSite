import {MongoClient} from 'mongodb'
import clientPromise from '../../lib/mongodb'


export async function GET(request) {
    
    console.log('hi');
    
    // Check if the method is GET, otherwise return 405
    if (request.method !== 'GET') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    console.log('h1');

    try {
        // Connect to the MongoDB client and get the database
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('receivedEmails');

        
        // Fetch emails from the collection
<<<<<<< HEAD
        const emails = await collection.find({}).toArray();
=======
        const a = await collection.find({}).toArray();
        
        
>>>>>>> d71a52ca2ca4454d8e9b8800a58c29cfc3cc1965

        // Return the emails as a JSON response
        return new Response(JSON.stringify(emails), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching emails:', error);
        return new Response(
            JSON.stringify({ message: 'Error fetching emails', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
