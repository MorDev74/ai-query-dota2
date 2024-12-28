import { URL_HERO_BASE } from '@/utils/config';

export async function POST(request: Request) {
  try {
    // Get parameters from request body
    const body = await request.json();
    const { patch_version, hero_id } = body;

    if (!hero_id || !patch_version) {
      return Response.json(
        { error: 'Both patch_version and hero_id are required' },
        { status: 400 }
      );
    }

    // Construct the URL
    const url = URL_HERO_BASE;

    // Set up the query parameters
    const params = new URLSearchParams({
      language: 'english',
      hero_id: hero_id.toString(),
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
      { data: data.result.data.heroes },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching hero:', error);
    return Response.json(
      { error: 'Failed to fetch hero data' },
      { status: 500 }
    );
  }
}
