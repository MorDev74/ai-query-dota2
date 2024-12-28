import { URL_ABILITY_BASE } from '@/utils/config';

export async function POST(request: Request) {
  try {
    // Get parameters from request body
    const body = await request.json();
    const { patch_version, ability_id } = body;

    if (!ability_id || !patch_version) {
      return Response.json(
        { error: 'Both patch_version and ability_id are required' },
        { status: 400 }
      );
    }

    // Construct the URL
    const url = URL_ABILITY_BASE;

    // Set up the query parameters
    const params = new URLSearchParams({
      language: 'english',
      ability_id: ability_id.toString(),
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

    return Response.json(
      { data: data.result.data.abilities },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching ability:', error);
    return Response.json(
      { error: 'Failed to fetch ability data' },
      { status: 500 }
    );
  }
}
