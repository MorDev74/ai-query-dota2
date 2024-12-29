import { supabaseClient }  from "@/utils/supabase";
import { URL_PATCH_NOTES_BASE } from '@/utils/config';

// Create Supabase client
export async function GET() {
  try {
    // 1. Fetch official patch notes
    const url = URL_PATCH_NOTES_BASE;
    const params = new URLSearchParams({
      language: 'english'
    });
    const patchListResponse = await fetch(`${url}?${params}`);
    const patchList = await patchListResponse.json();
    
    // Check if we have valid data
    if (!patchList || !Array.isArray(patchList.patches)) {
      throw new Error('Invalid patch list response format');
    }

    // 2. Get existing patches from Supabase
    const { data: existingPatches, error: queryError } = await supabaseClient
      .from('dota2_patch_notes')
      .select('patch_number')
      .order('patch_number', { ascending: false });

    if (queryError) {
      throw new Error(`Failed to query existing patches: ${queryError.message}`);
    }

    // Create a Set of existing patch versions for quick lookup
    const existingVersions = new Set(existingPatches?.map(p => p.patch_number) || []);
    
    const results = [];
    
    // 3. Process each patch from official API
    for (const patch of patchList.patches) {
      // Validate patch object
      if (!patch || !patch.patch_number) {
        console.warn('Invalid patch object:', patch);
        continue;
      }

      // Skip if patch already exists
      if (existingVersions.has(patch.patch_number)) {
        results.push({
          patch_version: patch.patch_number,
          status: 'skipped',
          message: 'Patch already exists in database'
        });
        console.log("skip");
        continue;
      }

      // Insert new patch into Supabase
      console.log("insert");
      const { error: insertError } = await supabaseClient
        .from('dota2_patch_notes')
        .insert({
          patch_number: patch.patch_number,
          patch_name: patch.patch_name,
          patch_timestamp: patch.patch_timestamp,
          owned: false,
        });

      results.push({
        patch_version: patch.patch_number,
        status: insertError ? 'error' : 'inserted',
        message: insertError ? insertError.message : 'Successfully inserted new patch',
      });
    }

    // Count the results
    const inserted = results.filter(r => r.status === 'inserted').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const errors = results.filter(r => r.status === 'error').length;

    return Response.json({
      success: true,
      message: `Processed ${results.length} patches: ${inserted} inserted, ${skipped} skipped, ${errors} errors`,
      data: results
    });

  } catch (error) {
    console.error('Error processing patch notes:', error);
    return Response.json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process patch notes'
    },{
      status: 500
    });
  }
} 