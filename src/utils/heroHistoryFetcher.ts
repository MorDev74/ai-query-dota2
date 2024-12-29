import fs from 'fs';
import path from 'path';

type PatchData = {
  patch_number: string;
  patch_name: string;
  patch_timestamp: number;
};

export async function fetchHeroHistory(heroId: number) {
  try {
    // 1. Fetch all patch notes to get versions
    const patchResponse = await fetch('http://localhost:3002/api/official_data/patch_notes', {
      method: 'GET'
    });
    const patchData = await patchResponse.json();
    
    if (!patchData.data || !Array.isArray(patchData.data)) {
      throw new Error('Failed to fetch patch notes');
    }

    // Create directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data', 'hero_history');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 2. Get patch numbers from the array
    const patchVersions = patchData.data.map((patch: PatchData) => patch.patch_number);
    console.log('Processing patches:', patchVersions);
    const results = [];

    for (const patchVersion of patchVersions) {
      const heroResponse = await fetch('http://localhost:3002/api/official_data/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patch_version: patchVersion,
          hero_id: heroId
        })
      });

      const heroData = await heroResponse.json();
      
      // Save to file
      const fileName = `${patchVersion}_${heroId}.json`;
      const filePath = path.join(dataDir, fileName);
      
      fs.writeFileSync(filePath, JSON.stringify(heroData, null, 2));
      
      results.push({
        patch_version: patchVersion,
        status: 'success',
        file: fileName
      });
    }

    return {
      success: true,
      message: `Successfully fetched and saved hero history for ${results.length} patches`,
      results
    };

  } catch (error) {
    console.error('Error fetching hero history:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
} 