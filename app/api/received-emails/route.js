import checkForEmails from "@/app/lib/recieveEmails";

export async function GET(request) {
    console.log("h1")
    const url = new URL(request.url);
    const params = url.searchParams;
    const user = params.get('user');
    const password = params.get('password')
    const host = params.get('host')
    const port = params.get('port')
    console.log(port)

    if (!user || !password || !host || !port) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    // Check if the method is GET, otherwise return 405
    if (request.method !== 'GET') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    try {
        // Connect to the MongoDB client and get the database
        const emails = await checkForEmails({ user, password, host, port });
        console.log("h1")
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
