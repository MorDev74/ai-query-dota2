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

export default function DevPanel() {
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const testEndpoints = {
    abilities: async () => {
      const response = await fetch('/api/official_data/abilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch_version: '7.37e' })
      });
      return response.json();
    },
    ability: async () => {
      const response = await fetch('/api/official_data/ability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patch_version: '7.37e',
          ability_id: 1809
        })
      });
      return response.json();
    },
    heroes: async () => {
      const response = await fetch('/api/official_data/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch_version: '7.37e' })
      });
      return response.json();
    },
    hero: async () => {
      const response = await fetch('/api/official_data/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patch_version: '7.37e',
          hero_id: 1
        })
      });
      return response.json();
    },
    items: async () => {
      const response = await fetch('/api/official_data/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patch_version: '7.37e' })
      });
      return response.json();
    },
    item: async () => {
      const response = await fetch('/api/official_data/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patch_version: '7.37e',
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
        body: JSON.stringify({ patch_version: '7.37e' })
      });
      return response.json();
    }
  };

  const handleClick = async (endpoint: keyof typeof testEndpoints) => {
    try {
      setLoading(true);
      const data = await testEndpoints[endpoint]();
      setResult(data);
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
