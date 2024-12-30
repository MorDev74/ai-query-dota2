import { supabaseClient } from "@/utils/supabase";
import { URL_ABILITY_LIST_BASE, URL_ABILITY_BASE } from '@/utils/config';

export async function POST(request: Request) {
  try {
    const { patch_version } = await request.json();
    if (!patch_version) {
      return Response.json({
        success: false,
        error: 'patch_version is required'
      }, { status: 400 });
    }

    // 1. Fetch ability list
    const listUrl = URL_ABILITY_LIST_BASE;
    const params = new URLSearchParams({
      language: 'english',
      patch_version: patch_version
    });

    const abilitiesResponse = await fetch(`${listUrl}?${params}`);
    const abilitiesData = await abilitiesResponse.json();

    // Check for correct data structure
    if (!abilitiesData?.result?.data?.itemabilities || !Array.isArray(abilitiesData.result.data.itemabilities)) {
      throw new Error('Invalid abilities data format');
    }

    const results = [];
    const totalCount = abilitiesData.result.data.itemabilities.length;
    let count = 0;

    // 2. Process each ability
    for (const abilityBasic of abilitiesData.result.data.itemabilities) {
      // Skip if ability data is invalid
      if (!abilityBasic?.id || !abilityBasic?.name) {
        console.warn('Invalid ability data:', abilityBasic);
        continue;
      }

      // Fetch detailed ability data
      const detailParams = new URLSearchParams({
        language: 'english',
        patch_version: patch_version,
        ability_id: abilityBasic.id.toString()
      });

      const detailResponse = await fetch(`${URL_ABILITY_BASE}?${detailParams}`);

      const detailData = await detailResponse.json();
      if (!detailData?.result?.data?.abilities?.[0]) {
        console.warn(`No detail data for ability ${abilityBasic.id}`);
        continue;
      }

      const ability = detailData.result.data.abilities[0];
      const { error: upsertError } = await supabaseClient
        .from('dota2_abilities')
        .insert({
          ability_id: ability.id,
          patch_version: patch_version,
          name: ability.name,
          name_loc: ability.name_loc,
          desc_loc: ability.desc_loc,
          lore_loc: ability.lore_loc,
          notes_loc: ability.notes_loc,
          shard_loc: ability.shard_loc,
          scepter_loc: ability.scepter_loc,
          facets_loc: ability.facets_loc,
          type: ability.type,
          behavior: ability.behavior.toString(),
          target_team: ability.target_team,
          target_type: ability.target_type,
          flags: ability.flags,
          damage: ability.damage,
          immunity: ability.immunity,
          dispellable: ability.dispellable,
          max_level: ability.max_level,
          cast_ranges: ability.cast_ranges,
          cast_points: ability.cast_points,
          channel_times: ability.channel_times,
          cooldowns: ability.cooldowns,
          durations: ability.durations,
          damages: ability.damages,
          mana_costs: ability.mana_costs,
          gold_costs: ability.gold_costs,
          health_costs: ability.health_costs,
          special_values: ability.special_values,
          is_item: ability.is_item,
          ability_has_scepter: ability.ability_has_scepter,
          ability_has_shard: ability.ability_has_shard,
          ability_is_granted_by_scepter: ability.ability_is_granted_by_scepter,
          ability_is_granted_by_shard: ability.ability_is_granted_by_shard,
          ability_is_innate: ability.ability_is_innate,
          item_cost: ability.item_cost,
          item_initial_charges: ability.item_initial_charges,
          item_neutral_tier: ability.item_neutral_tier,
          item_stock_max: ability.item_stock_max,
          item_stock_time: ability.item_stock_time,
          item_quality: ability.item_quality
        });
      count += 1;
      console.log(upsertError ? upsertError.message :`${count}/${totalCount} - ${patch_version} | ${ability.id}`);

      results.push({
        ability_id: ability.id,
        name: ability.name,
        status: upsertError ? 'error' : 'success',
        message: upsertError ? upsertError.message : 'Successfully saved ability data'
      });

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Insert or update ability in Supabase with exact table structure
    const succeeded = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'error').length;

    return Response.json({
      success: true,
      message: `Processed ${results.length} abilities: ${succeeded} succeeded, ${failed} failed`,
      data: results
    });
  } catch (error) {
    console.error('Error processing abilities:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process abilities'
    }, {
      status: 500
    });
  }
} 