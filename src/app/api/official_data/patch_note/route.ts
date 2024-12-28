import { URL_PATCH_NOTE_BASE } from '@/utils/config';

export async function POST(request: Request) {
  try {
    // Get parameters from request body
    const body = await request.json()
    const { patch_version } = body

    if (!patch_version) {
      return Response.json(
        { error: 'patch_version is required' },
        { status: 400 }
      )
    }

    // Construct the URL
    const url = URL_PATCH_NOTE_BASE

    // Set up the query parameters
    const params = new URLSearchParams({
      language: 'english',
      version: patch_version
    })

    // Make the request
    const response = await fetch(`${url}?${params}`)

    if (!response.ok) {
      return Response.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return Response.json(
      { data: data },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching patch note:', error)
    return Response.json(
      { error: 'Failed to fetch patch note data' },
      { status: 500 }
    )
  }
}
