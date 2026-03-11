import { Handler } from '@netlify/functions';
import { connectToDatabase, Submission } from './lib/db';

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const { email, userType } = JSON.parse(event.body || '{}');

    // Validate input
    if (!email || !userType) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and userType are required' }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    // Validate userType
    if (!['user', 'expert'].includes(userType)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid userType. Must be "user" or "expert"' }),
      };
    }

    // Connect to database
    await connectToDatabase();

    // Check if email already exists
    const existingSubmission = await Submission.findOne({ email: email.toLowerCase() });
    if (existingSubmission) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ error: 'Email already registered' }),
      };
    }

    // Create new submission
    const submission = new Submission({
      email: email.toLowerCase(),
      userType,
    });

    await submission.save();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: "All set! You're on the DoneThat waitlist.",
        data: {
          email: submission.email,
          userType: submission.userType,
          createdAt: submission.createdAt,
        },
      }),
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
