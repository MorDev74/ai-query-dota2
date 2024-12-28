import { URL_ABILITY_LIST_BASE } from '@/utils/config';

export async function POST(request: Request) {
  try {
    // Get parameters from request body
    const body = await request.json();
    const { patch_version } = body;

    if (!patch_version) {
      return Response.json(
        { error: 'patch_version is required' },
        { status: 400 }
      );
    }

    // Construct the URL
    const url = URL_ABILITY_LIST_BASE;

    // Set up the query parameters
    const params = new URLSearchParams({
      language: 'english',
      patch_version: patch_version
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

    // Return specifically the itemabilities with status 200
    return Response.json(
      { data: data.result.data.itemabilities },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching abilities:', error);
    return Response.json(
      { error: 'Failed to fetch abilities data' },
      { status: 500 }
    );
  }
}
