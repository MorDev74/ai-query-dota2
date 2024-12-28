import { URL_PATCH_NOTES_BASE } from '@/utils/config';

export async function GET() {
  try {
    // Construct the URL
    const url = URL_PATCH_NOTES_BASE;

    // Set up the query parameters
    const params = new URLSearchParams({
      language: 'english'
    });

    // Make the request
    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      return Response.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Return patches data with status 200
    return Response.json(
      { data: data.patches},
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching patch notes list:', error);
    return Response.json(
      { error: 'Failed to fetch patch notes list' },
      { status: 500 }
    );
  }
}