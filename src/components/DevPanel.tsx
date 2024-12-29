'use client';

import { useState } from 'react';

type ApiData = {
  abilities?: Record<string, unknown>;
  heroes?: Record<string, unknown>;
  items?: Record<string, unknown>;
  patches?: Record<string, unknown>;
};

type ApiResponse = {
  data?: ApiData;
  error?: string;
};

type SaveFileData = ApiResponse | Record<string, unknown>;

const CURRENT_PATCH = '7.36';

const saveToFile = async (filename: string, data: SaveFileData) => {
  try {
    const response = await fetch('/api/dev/save-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        data,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save file');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
};

export default function DevPanel() {
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const testEndpoints = {
    abilities: async () => {
      const response = await fetch('/api/official_data/abilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch_version: CURRENT_PATCH })
      });
      return response.json();
    },
    ability: async () => {
      const response = await fetch('/api/official_data/ability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patch_version: CURRENT_PATCH,
          ability_id: 1809
        })
      });
      return response.json();
    },
    heroes: async () => {
      const response = await fetch('/api/official_data/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch_version: CURRENT_PATCH })
      });
      return response.json();
    },
    hero: async () => {
      const response = await fetch('/api/official_data/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patch_version: CURRENT_PATCH,
          hero_id: 1
        })
      });
      return response.json();
    },
    items: async () => {
      const response = await fetch('/api/official_data/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch_version: CURRENT_PATCH })
      });
      return response.json();
    },
    item: async () => {
      const response = await fetch('/api/official_data/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patch_version: CURRENT_PATCH,
          item_id: 600
        })
      });
      return response.json();
    },
    patchNotes: async () => {
      const response = await fetch('/api/official_data/patch_notes', {
        method: 'GET'
      });
      return response.json();
    },
    patchNote: async () => {
      const response = await fetch('/api/official_data/patch_note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch_version: CURRENT_PATCH })
      });
      const data = await response.json();
      
      // Save file with patch version in filename
      await saveToFile(`patchNote_${CURRENT_PATCH.replace('.', '')}.json`, data);
      return data;
    },
    fetchHeroHistory: async () => {
      const response = await fetch('/api/dev/fetch-hero-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          hero_id: 1
        })
      });
      return response.json();
    },
    saveAllPatchNotes: async () => {
      const patchesResponse = await fetch('/api/official_data/patch_notes', {
        method: 'GET'
      });
      const patchesData = await patchesResponse.json();
      
      const results = [];
      for (const patch of patchesData.data) {
        const response = await fetch('/api/official_data/patch_note', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patch_version: patch["patch_number"] })
        });
        const data = await response.json();
        
        await saveToFile(`patchNote_${patch["patch_number"].replace('.', '')}.json`, data);
        results.push({ patch, success: true });
      }
      
      return { success: true, savedPatches: results };
    },
    savePatchNotesToDB: async () => {
      const response = await fetch('/api/database/patch-notes', {
        method: 'GET'
      });
      return response.json();
    },
  };

  const handleClick = async (endpoint: keyof typeof testEndpoints) => {
    try {
      setLoading(true);
      const data = await testEndpoints[endpoint]();
      setResult(data);
      
      await saveToFile(`${endpoint}.json`, data);
      
    } catch (error) {
      console.error(`Error testing ${endpoint}:`, error);
      setResult({ error: `Failed to test ${endpoint}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(testEndpoints).map((endpoint) => (
          <button
            key={endpoint}
            onClick={() => handleClick(endpoint as keyof typeof testEndpoints)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            Test {endpoint}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Result:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <pre className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-[500px]">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
