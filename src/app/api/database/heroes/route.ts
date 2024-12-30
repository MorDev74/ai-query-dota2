import { supabaseClient } from "@/utils/supabase";
import { URL_HEROES_BASE, URL_HERO_BASE } from '@/utils/config';

export async function POST(request: Request) {
  try {
    const { patch_version } = await request.json();
    if (!patch_version) {
      return Response.json({
        success: false,
        error: 'patch_version is required'
      }, { status: 400 });
    }

    // 1. Fetch hero list
    const listUrl = URL_HEROES_BASE;
    const params = new URLSearchParams({
      language: 'english',
      patch_version: patch_version
    });
    
    const heroesResponse = await fetch(`${listUrl}?${params}`);
    const heroesData = await heroesResponse.json();

    // Check for correct data structure
    if (!heroesData?.result?.data?.heroes || !Array.isArray(heroesData.result.data.heroes)) {
      throw new Error('Invalid heroes data format');
    }

    const results = [];
    const totalCount = heroesData.result.data.heroes.length;
    let count = 0;

    // 2. Process each hero
    for (const heroBasic of heroesData.result.data.heroes) {
      // Skip if hero data is invalid
      if (!heroBasic?.id || !heroBasic?.name) {
        console.warn('Invalid hero data:', heroBasic);
        continue;
      }

      // Fetch detailed hero data
      const detailParams = new URLSearchParams({
        language: 'english',
        patch_version: patch_version,
        hero_id: heroBasic.id.toString()
      });

      const detailResponse = await fetch(`${URL_HERO_BASE}?${detailParams}`);
      const detailData = await detailResponse.json();

      if (!detailData?.result?.data?.heroes?.[0]) {
        console.warn(`No detail data for hero ${heroBasic.id}`);
        continue;
      }

      const hero = detailData.result.data.heroes[0];
      const { error: upsertError } = await supabaseClient
        .from('dota2_heroes')
        .insert({
          patch_version: patch_version,
          hero_id: hero.id,
          name: hero.name,
          order_id: hero.order_id,
          name_loc: hero.name_loc,
          bio_loc: hero.bio_loc,
          hype_loc: hero.hype_loc,
          npe_desc_loc: hero.npe_desc_loc,
          facets: hero.facets,
          facet_abilities: hero.facet_abilities,
          str_base: hero.str_base,
          str_gain: hero.str_gain,
          agi_base: hero.agi_base,
          agi_gain: hero.agi_gain,
          int_base: hero.int_base,
          int_gain: hero.int_gain,
          primary_attr: hero.primary_attr,
          complexity: hero.complexity,
          attack_capability: hero.attack_capability,
          role_levels: hero.role_levels,
          damage_min: hero.damage_min,
          damage_max: hero.damage_max,
          attack_rate: hero.attack_rate,
          attack_range: hero.attack_range,
          projectile_speed: hero.projectile_speed,
          armor: hero.armor,
          magic_resistance: hero.magic_resistance,
          movement_speed: hero.movement_speed,
          turn_rate: hero.turn_rate,
          sight_range_day: hero.sight_range_day,
          sight_range_night: hero.sight_range_night,
          max_health: hero.max_health,
          health_regen: hero.health_regen,
          max_mana: hero.max_mana,
          mana_regen: hero.mana_regen,
          abilities: hero.abilities?.map((a: { id: number }) => a.id) || [], // Extract ability IDs
          talents: hero.talents
        });

      count += 1;
      console.log(upsertError ? upsertError.message : `${count}/${totalCount} - ${patch_version} | ${hero.id}`);

      results.push({
        hero_id: hero.id,
        name: hero.name,
        status: upsertError ? 'error' : 'success',
        message: upsertError ? upsertError.message : 'Successfully saved hero data'
      });

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const succeeded = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'error').length;

    return Response.json({
      success: true,
      message: `Processed ${results.length} heroes: ${succeeded} succeeded, ${failed} failed`,
      data: results
    });

  } catch (error) {
    console.error('Error processing heroes:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process heroes'
    }, {
      status: 500
    });
  }
} 