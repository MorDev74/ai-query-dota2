import { supabaseClient } from "@/utils/supabase";
import { URL_PATCH_NOTES_BASE, URL_PATCH_NOTE_BASE } from '@/utils/config';

const CATEGORIES = ['generic', 'items', 'neutral_items', 'heroes', 'neutral_creeps'];

export async function GET() {
  try {
    // 1. Fetch patch notes list
    const listUrl = URL_PATCH_NOTES_BASE;
    const params = new URLSearchParams({
      language: 'english'
    });
    
    const patchListResponse = await fetch(`${listUrl}?${params}`);
    const patchList = await patchListResponse.json();

    if (!patchList?.patches || !Array.isArray(patchList.patches)) {
      throw new Error('Invalid patch list format');
    }

    const results = [];
    const totalCount = patchList.patches.length;
    let count = 0;

    // 2. Process each patch
    for (const patchBasic of patchList.patches) {
      // Skip if patch data is invalid
      if (!patchBasic?.patch_number) {
        console.warn('Invalid patch data:', patchBasic);
        continue;
      }

      // Fetch detailed patch note data
      const detailParams = new URLSearchParams({
        language: 'english',
        version: patchBasic.patch_number
      });

      const detailResponse = await fetch(`${URL_PATCH_NOTE_BASE}?${detailParams}`);
      const detailData = await detailResponse.json();

      const patchData = detailData;
      count += 1;
      console.log(`Processing ${count}/${totalCount} - ${patchBasic.patch_number}`);

      // Process each category
      for (const category of CATEGORIES) {
        if (patchData[category]) {
          const categoryData = patchData[category];
          
          // Handle array or object data
          const contentArray = Array.isArray(categoryData) 
            ? categoryData 
            : Object.entries(categoryData).map(([key, value]) => ({
                key,
                ...(typeof value === 'object' && value !== null ? value : { value })
              }));

          // Insert each content item as a separate row
          for (const content of contentArray) {
            const { error: insertError } = await supabaseClient
              .from('dota2_patch_notes')
              .insert({
                patch_number: patchBasic.patch_number,
                patch_name: patchBasic.patch_name,
                patch_timestamp: patchBasic.patch_timestamp,
                category: category,
                content: content
              });

            if (insertError) {
              console.warn(`Error inserting ${category} data for patch ${patchBasic.patch_number}:`, insertError);
            }

            results.push({
              patch_number: patchBasic.patch_number,
              category: category,
              status: insertError ? 'error' : 'success',
              message: insertError ? insertError.message : 'Successfully saved patch note data'
            });
          }
        }
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const succeeded = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'error').length;

    return Response.json({
      success: true,
      message: `Processed ${results.length} patch note entries: ${succeeded} succeeded, ${failed} failed`,
      data: results
    });

  } catch (error) {
    console.error('Error processing patch notes:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process patch notes'
    }, {
      status: 500
    });
  }
} 