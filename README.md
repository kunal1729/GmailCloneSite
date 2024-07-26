# Setup Instructions

1. Clone the repository.
2. Create a `.env.local` file in your root directory.
3. Paste your environment variables into the `.env.local` file.
4. Run the development server using `npm run dev`.

## Sample `.env.local` Configuration

### SMTP Configuration

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
NODE_ENV=production # or 'development'

### MongoDB Configuration

MONGODB_URI=

### IMAP configuration

IMAP_HOST= 
IMAP_PORT=993