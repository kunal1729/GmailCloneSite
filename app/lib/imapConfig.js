const imapConfig = {
    imap: {
        user: process.env.SMTP_USER, // Your email user
        password: process.env.SMTP_PASS, // Your email password
        host: process.env.SMTP_HOST,
        port: process.env.IMAP_PORT, // IMAP port should be a number
        tls: true, // Secure connection
        tlsOptions: { rejectUnauthorized: false , servername:process.env.SMTP_HOST },
        authTimeout: 10000 // Optional, timeout for authentication
    }
};

export default imapConfig;
