import { Handler } from '@netlify/functions';
import { connectToDatabase, Submission } from './lib/db';

export const handler: Handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Simple API key authentication
    const apiKey = event.headers['x-api-key'];
    const expectedApiKey = process.env.ADMIN_API_KEY;

    if (!apiKey || apiKey !== expectedApiKey) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    // Parse query parameters for cursor-based pagination
    const queryParams = event.queryStringParameters || {};
    const limit = parseInt(queryParams.limit || '20', 10);
    const cursor = queryParams.cursor; // createdAt timestamp
    const userTypeFilter = queryParams.userType; // Optional filter

    // Connect to database
    await connectToDatabase();

    // Build query
    const query: any = {};
    
    // Apply cursor for pagination
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    // Apply userType filter if provided
    if (userTypeFilter && ['user', 'expert'].includes(userTypeFilter)) {
      query.userType = userTypeFilter;
    }

    // Fetch submissions with cursor-based pagination
    const submissions = await Submission.find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit + 1) // Fetch one extra to determine if there are more results
      .lean();

    // Determine if there are more results
    const hasMore = submissions.length > limit;
    const results = hasMore ? submissions.slice(0, limit) : submissions;

    // Get next cursor (createdAt of last item)
    const nextCursor = hasMore && results.length > 0
      ? results[results.length - 1].createdAt.toISOString()
      : null;

    // Get total count
    const totalCount = await Submission.countDocuments(
      userTypeFilter ? { userType: userTypeFilter } : {}
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: results,
        pagination: {
          hasMore,
          nextCursor,
          limit,
          total: totalCount,
        },
      }),
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
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
