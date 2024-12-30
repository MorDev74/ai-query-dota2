import { supabaseClient } from "@/utils/supabase";
import { URL_ITEMS_BASE, URL_ITEM_BASE } from '@/utils/config';

export async function POST(request: Request) {
  try {
    const { patch_version } = await request.json();
    if (!patch_version) {
      return Response.json({
        success: false,
        error: 'patch_version is required'
      }, { status: 400 });
    }

    // 1. Fetch item list
    const listUrl = URL_ITEMS_BASE;
    const params = new URLSearchParams({
      language: 'english',
      version: patch_version
    });
    
    const itemsResponse = await fetch(`${listUrl}?${params}`);
    const itemsData = await itemsResponse.json();

    // Check for correct data structure
    if (!itemsData?.result?.data?.itemabilities || !Array.isArray(itemsData.result.data.itemabilities)) {
      throw new Error('Invalid items data format');
    }

    const results = [];
    const totalCount = itemsData.result.data.itemabilities.length;
    let count = 0;

    // 2. Process each item
    for (const itemBasic of itemsData.result.data.itemabilities) {
      // Skip if item data is invalid
      if (!itemBasic?.id || !itemBasic?.name) {
        console.warn('Invalid item data:', itemBasic);
        continue;
      }

      // Fetch detailed item data
      const detailParams = new URLSearchParams({
        language: 'english',
        version: patch_version,
        item_id: itemBasic.id.toString()
      });

      const detailResponse = await fetch(`${URL_ITEM_BASE}?${detailParams}`);
      const detailData = await detailResponse.json();

      if (!detailData?.result?.data?.items?.[0]) {
        console.warn(`No detail data for item ${itemBasic.id}`);
        continue;
      }

      const item = detailData.result.data.items[0];
      const { error: upsertError } = await supabaseClient
        .from('dota2_items')
        .insert({
          patch_version: patch_version,
          item_id: item.id,
          name: item.name,
          name_loc: item.name_loc,
          desc_loc: item.desc_loc,
          lore_loc: item.lore_loc,
          notes_loc: item.notes_loc,
          shard_loc: item.shard_loc,
          scepter_loc: item.scepter_loc,
          facets_loc: item.facets_loc,
          type: item.type,
          behavior: item.behavior?.toString(),
          target_team: item.target_team,
          target_type: item.target_type,
          flags: item.flags,
          damage: item.damage,
          immunity: item.immunity,
          dispellable: item.dispellable,
          max_level: item.max_level,
          cast_ranges: item.cast_ranges,
          cast_points: item.cast_points,
          channel_times: item.channel_times,
          cooldowns: item.cooldowns,
          durations: item.durations,
          damages: item.damages,
          mana_costs: item.mana_costs,
          gold_costs: item.gold_costs,
          health_costs: item.health_costs,
          special_values: item.special_values,
          is_item: item.is_item,
          ability_has_scepter: item.ability_has_scepter,
          ability_has_shard: item.ability_has_shard,
          ability_is_granted_by_scepter: item.ability_is_granted_by_scepter,
          ability_is_granted_by_shard: item.ability_is_granted_by_shard,
          ability_is_innate: item.ability_is_innate,
          item_cost: item.item_cost,
          item_initial_charges: item.item_initial_charges,
          item_neutral_tier: item.item_neutral_tier,
          item_stock_max: item.item_stock_max,
          item_stock_time: item.item_stock_time,
          item_quality: item.item_quality
        });

      count += 1;
      console.log(upsertError ? upsertError.message : `${count}/${totalCount} - ${patch_version} | ${item.id}`);

      results.push({
        item_id: item.id,
        name: item.name,
        status: upsertError ? 'error' : 'success',
        message: upsertError ? upsertError.message : 'Successfully saved item data'
      });

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const succeeded = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'error').length;

    return Response.json({
      success: true,
      message: `Processed ${results.length} items: ${succeeded} succeeded, ${failed} failed`,
      data: results
    });

  } catch (error) {
    console.error('Error processing items:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process items'
    }, {
      status: 500
    });
  }
} 