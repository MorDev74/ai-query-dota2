import { NextResponse } from 'next/server';
import { fetchHeroHistory } from '@/utils/heroHistoryFetcher';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hero_id } = body;

    if (!hero_id) {
      return NextResponse.json({ error: 'hero_id is required' }, { status: 400 });
    }

    const result = await fetchHeroHistory(hero_id);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in fetch-hero-history API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero history' },
      { status: 500 }
    );
  }
} 