# DoneThat - Landing Page & Admin Dashboard

## Features

### Landing Page
- ✅ Modern, responsive landing page with scroll animations
- ✅ Email signup form with user type selection (Aspiring Entrepreneur / Business Owner)
- ✅ Netlify Functions integration for serverless backend
- ✅ MongoDB Atlas for data persistence
- ✅ Form validation and error handling

### Admin Dashboard
- ✅ Secure admin dashboard at `/admin` route  
- ✅ API key authentication
- ✅ Cursor-based pagination for efficient data loading
- ✅ Filter submissions by user type
- ✅ Export data to CSV
- ✅ Real-time statistics display

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Netlify Functions (Serverless)
- **Database**: MongoDB Atlas with Mongoose
- **Routing**: React Router

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string

### 3. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Update the `.env` file with your MongoDB connection string and admin API key:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/donethat?retryWrites=true&w=majority
ADMIN_API_KEY=your-secret-admin-key-here
```

**Important**: Never commit the `.env` file to version control.

### 4. Run Development Server

#### Option 1: Vite Dev Server (Frontend Only)

```bash
npm run dev
```

This runs only the frontend at `http://localhost:5173`. Netlify Functions won't work.

#### Option 2: Netlify Dev (Full Stack)

Install Netlify CLI globally (if not already installed):

```bash
npm install -g netlify-cli
```

Run the development environment:

```bash
netlify dev
```

This runs the full stack (frontend + Netlify Functions) at `http://localhost:8888`.

**Note**: Use Netlify Dev to test form submissions and the admin dashboard.

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```
donethatapp/
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx         # Main form with Netlify Function integration
│   │   ├── SocialProofBar.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── AdminDashboard.tsx # Admin dashboard component
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx              # Main app with routing
│   └── main.tsx
├── netlify/
│   └── functions/
│       ├── lib/
│       │   └── db.ts        # MongoDB connection & schema
│       ├── submit-form.ts   # Form submission endpoint
│       └── get-submissions.ts # Admin data retrieval endpoint
├── .env                     # Environment variables (DO NOT COMMIT)
├── .env.example             # Example environment variables
├── netlify.toml             # Netlify configuration
└── package.json
```

## API Endpoints

### POST `/api/submit-form`

Submit a new waitlist signup.

**Request Body:**
```json
{
  "email": "user@example.com",
  "userType": "user" // or "expert"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist",
  "data": {
    "email": "user@example.com",
    "userType": "user",
    "createdAt": "2026-03-11T10:30:00.000Z"
  }
}
```

### GET `/api/get-submissions`

Retrieve submissions with cursor-based pagination (requires API key).

**Headers:**
```
X-API-Key: your-secret-admin-key-here
```

**Query Parameters:**
- `limit` (optional): Number of results per page (default: 20)
- `cursor` (optional): Timestamp for pagination
- `userType` (optional): Filter by user type ("user" or "expert")

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "email": "user@example.com",
      "userType": "user",
      "createdAt": "2026-03-11T10:30:00.000Z"
    }
  ],
  "pagination": {
    "hasMore": true,
    "nextCursor": "2026-03-11T10:25:00.000Z",
    "limit": 20,
    "total": 157
  }
}
```

## Admin Dashboard

Access the admin dashboard at `/admin` (e.g., `http://localhost:8888/admin`).

**Authentication:**
- Enter the API key you set in your `.env` file
- The API key is validated with each data request

**Features:**
- View all submissions in a paginated table
- Filter by user type (All / Aspiring Entrepreneurs / Business Owners)
- Load more results with cursor-based pagination
- Export all data to CSV
- View real-time statistics

## Database Schema

**Collection:** `submissions`

```typescript
{
  email: String (required, lowercase, trimmed)
  userType: String (required, enum: ['user', 'expert'])
  createdAt: Date (default: now, indexed)
}
```

**Indexes:**
- `createdAt: -1` (for efficient cursor pagination)
- `{ createdAt: -1, _id: -1 }` (compound index for stable ordering)

## Deployment to Netlify

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Configure environment variables in Netlify dashboard:
   - `MONGODB_URI`
   - `ADMIN_API_KEY`
4. Deploy!

Netlify will automatically:
- Build your Vite app
- Deploy Netlify Functions
- Set up redirects for API routes

## Environment Variables in Production

In your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ADMIN_API_KEY`: A strong, random API key for admin access

## Security Notes

- ✅ `.env` file is gitignored
- ✅ Admin dashboard requires API key authentication
- ✅ Form validation on both frontend and backend
- ✅ Email uniqueness check to prevent duplicates
- ✅ CORS headers configured for security
- ✅ MongoDB connection string never exposed to client

## Troubleshooting

### Netlify Functions not working locally

**Solution**: Use `netlify dev` instead of `npm run dev`

### MongoDB connection error

**Possible causes:**
1. Incorrect connection string in `.env`
2. IP address not whitelisted in MongoDB Atlas
3. Database user credentials incorrect

### Admin dashboard shows "Unauthorized"

**Solution**: Check that `ADMIN_API_KEY` in `.env` matches what you're entering

### No data showing in dashboard

**Possible causes:**
1. No submissions yet (test the form first)
2. Netlify Functions not running (use `netlify dev`)
3. MongoDB connection issue (check console logs)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
