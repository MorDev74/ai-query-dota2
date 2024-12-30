export const URL_IMAGE_HERO="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/"
export const URL_IMAGE_ABILITY="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/abilities/"
export const URL_IMAGE_ITEM="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/"
export const URL_IMAGE_UNIT="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/units/"
export const URL_IMAGE_ICON="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/"

export const URL_PATCH_NOTES_BASE="https://www.dota2.com/datafeed/patchnoteslist"
export const URL_PATCH_NOTE_BASE="https://www.dota2.com/datafeed/patchnotes"

export const URL_ABILITY_LIST_BASE="https://www.dota2.com/datafeed/abilitylist"
export const URL_ABILITY_BASE="https://www.dota2.com/datafeed/abilitydata"

export const URL_ITEMS_BASE="https://www.dota2.com/datafeed/itemlist"
export const URL_ITEM_BASE="https://www.dota2.com/datafeed/itemdata"

export const URL_HEROES_BASE="https://www.dota2.com/datafeed/herolist"
export const URL_HERO_BASE="https://www.dota2.com/datafeed/herodata"

// dota2 setting
export const primaryAttributeMap = {
    0: "Strength", 1: "Agility", 2: "Intelligence", 3: "Universal"
};
// carry,support,nuker,disabler,durable,escape,pusher,initiator
export const roleLevelMap = {
    0:"Carry",1:"Support",2:"Nuker",3:"Disabler",4:"Durable",5:"Escape",6:"Pusher",7:"Initiator",8:""
};
// dota2 setting


export const llmList = [
    "openai/gpt-4o-2024-11-20",
    "openai/gpt-4o",
];

export const categoryKeys = [
    "hero", "item", "ability", "patch_note",
];

export const categoryList = [
    { value: "Hero", key:"hero", enabled: true, },
    { value: "Item", key:"item", enabled: false, },
    { value: "Ability", key:"ability", enabled: false, },
    { value: "Patch Note", key:"patch_note", enabled: false, },
];

// === Sql Query ===
export const systemMessageHero = `You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
    DOTA2Hero (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        name_loc TEXT NOT NULL,
        primary_attr INTEGER NOT NULL,
        complexity INTEGER NOT NULL,
        str_base FLOAT NOT NULL,
        str_gain FLOAT NOT NULL,
        agi_base FLOAT NOT NULL,
        agi_gain FLOAT NOT NULL,
        int_base FLOAT NOT NULL,
        int_gain FLOAT NOT NULL,
        attack_capability INTEGER NOT NULL,
        damage_min FLOAT NOT NULL,
        damage_max FLOAT NOT NULL,
        attack_rate FLOAT NOT NULL,
        attack_range FLOAT NOT NULL,
        projectile_speed FLOAT NOT NULL,
        armor FLOAT NOT NULL,
        magic_resistance FLOAT NOT NULL,
        movement_speed FLOAT NOT NULL,
        turn_rate FLOAT NOT NULL,
        sight_range_day FLOAT NOT NULL,
        sight_range_night FLOAT NOT NULL,
        max_health FLOAT NOT NULL,
        health_regen FLOAT NOT NULL,
        max_mana FLOAT NOT NULL,
        mana_regen FLOAT NOT NULL
    );

    Only retrieval queries are allowed.

    Additional select column(s): id, name, name_loc.
`;

export const systemBaseSqlQuery = `You are a SQL (postgres) expert.
Only retrieval queries are allowed.
Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
`;

export const systemMessageHeroes = `${systemBaseSqlQuery}

    dota2_heroes (
        id SERIAL PRIMARY KEY,              -- Auto-incrementing primary key for the table.
        patch_version VARCHAR NOT NULL,     -- The patch version of the game where the hero data is relevant.
        hero_id INT NOT NULL,               -- The unique identifier for the hero (from the original dataset).
        name VARCHAR NOT NULL,              -- Internal name of the hero (used in the game's code).
        order_id INT,                       -- The order ID for the hero in the hero list.
        name_loc VARCHAR,                   -- The localized name of the hero (displayed in-game).
        bio_loc TEXT,                       -- The localized biography of the hero.
        hype_loc TEXT,                      -- A short description highlighting the hero's key features or strengths.
        npe_desc_loc TEXT,                  -- A description of the hero aimed at new players.
        facets JSONB,                       -- A JSONB column for storing hero facet-related data.
        facet_abilities JSONB,              -- A JSONB column for storing abilities related to facets.
        str_base INT,                       -- The base strength of the hero.
        str_gain FLOAT,                     -- The strength gain per level for the hero.
        agi_base INT,                       -- The base agility of the hero.
        agi_gain FLOAT,                     -- The agility gain per level for the hero.
        int_base INT,                       -- The base intelligence of the hero.
        int_gain FLOAT,                     -- The intelligence gain per level for the hero.
        primary_attr INT,                   -- The primary attribute of the hero (1 = Strength, 2 = Agility, 3 = Intelligence).
        complexity INT,                     -- The complexity level of the hero (used for categorizing hero difficulty).
        attack_capability INT,              -- Attack capability (e.g., melee or ranged).
        role_levels JSONB,                  -- A JSONB column for storing role levels of the hero (e.g., carry, support, etc.).
        damage_min INT,                     -- Minimum base damage of the hero.
        damage_max INT,                     -- Maximum base damage of the hero.
        attack_rate FLOAT,                  -- Attack rate of the hero (time between attacks).
        attack_range INT,                   -- The attack range of the hero (melee or ranged distance).
        projectile_speed INT,               -- The speed of projectiles (if the hero is ranged).
        armor FLOAT,                        -- Base armor value of the hero.
        magic_resistance FLOAT,             -- Percentage of base magic resistance.
        movement_speed INT,                 -- The base movement speed of the hero.
        turn_rate FLOAT,                    -- The turn rate of the hero.
        sight_range_day INT,                -- Daytime vision range of the hero.
        sight_range_night INT,              -- Nighttime vision range of the hero.
        max_health FLOAT,                   -- Maximum health at level 1.
        health_regen FLOAT,                 -- Health regeneration rate per second.
        max_mana FLOAT,                     -- Maximum mana at level 1.
        mana_regen FLOAT,                   -- Mana regeneration rate per second.
        abilities INT[],                    -- An integer array for storing ability IDs of the hero.
        talents JSONB,                      -- A JSONB column for storing the hero's talent tree data.
    );

    Additional select column(s): hero_id, name, name_loc.
`;

export const systemMessageItems= `${systemBaseSqlQuery}

    dota2_items (
        patch_version VARCHAR, -- Version information
        item_id INTEGER, -- Original item ID renamed to item_id
        name VARCHAR, -- Item internal name
        name_loc VARCHAR, -- Localized item name
        desc_loc TEXT, -- Localized item description
        lore_loc TEXT, -- Localized item lore
        notes_loc JSONB, -- Additional notes (stored as JSON array)
        shard_loc TEXT, -- Shard details
        scepter_loc TEXT, -- Scepter details
        facets_loc JSONB, -- Facets (stored as JSON array)
        type INTEGER, -- Type information
        behavior VARCHAR, -- Behavior flags
        target_team INTEGER, -- Target team details
        target_type INTEGER, -- Target type details
        flags INTEGER, -- Item flags
        damage INTEGER, -- Damage type
        immunity INTEGER, -- Immunity details
        dispellable INTEGER, -- Dispellable status
        max_level INTEGER, -- Maximum level
        cast_ranges JSONB, -- Cast ranges (stored as JSON array)
        cast_points JSONB, -- Cast points (stored as JSON array)
        channel_times JSONB, -- Channel times (stored as JSON array)
        cooldowns JSONB, -- Cooldowns (stored as JSON array)
        durations JSONB, -- Durations (stored as JSON array)
        damages JSONB, -- Damage values (stored as JSON array)
        mana_costs JSONB, -- Mana costs (stored as JSON array)
        gold_costs JSONB, -- Gold costs (stored as JSON array)
        health_costs JSONB, -- Health costs (stored as JSON array)
        special_values JSONB, -- Special values (stored as JSON object)
        is_item BOOLEAN, -- Whether the entry is an item
        ability_has_scepter BOOLEAN, -- Scepter ability status
        ability_has_shard BOOLEAN, -- Shard ability status
        ability_is_granted_by_scepter BOOLEAN, -- Scepter-granted ability
        ability_is_granted_by_shard BOOLEAN, -- Shard-granted ability
        ability_is_innate BOOLEAN, -- Innate ability
        item_cost INTEGER, -- Item cost in gold
        item_initial_charges INTEGER, -- Initial charges
        item_neutral_tier BIGINT, -- Neutral tier level
        item_stock_max INTEGER, -- Maximum stock
        item_stock_time INTEGER, -- Stock refresh time
        item_quality INTEGER, -- Item quality
    );

    Additional select column(s): item_id, name, name_loc.
`;

export const systemMessageAbilities= `${systemBaseSqlQuery}

    dota2_abilities (
        patch_version VARCHAR(50),             -- Patch version
        ability_id INT NOT NULL,               -- Renamed ability's ID from the JSON file
        name VARCHAR(100),                     -- Ability internal name (e.g., "dota_empty_ability")
        name_loc VARCHAR(100),                 -- Localized name
        desc_loc TEXT,                         -- Localized description
        lore_loc TEXT,                         -- Lore text
        notes_loc JSONB,                       -- JSON array for notes
        shard_loc TEXT,                        -- Shard description
        scepter_loc TEXT,                      -- Scepter description
        facets_loc JSONB,                      -- JSON array for facets
        type INT,                              -- Ability type
        behavior VARCHAR(50),                  -- Ability behavior (string from JSON)
        target_team INT,                       -- Target team
        target_type INT,                       -- Target type
        flags INT,                             -- Flags
        damage INT,                            -- Damage type
        immunity INT,                          -- Immunity type
        dispellable INT,                       -- Dispellable type
        max_level INT,                         -- Maximum level of ability
        cast_ranges JSONB,                     -- JSON array for cast ranges
        cast_points JSONB,                     -- JSON array for cast points
        channel_times JSONB,                   -- JSON array for channel times
        cooldowns JSONB,                       -- JSON array for cooldowns
        durations JSONB,                       -- JSON array for durations
        damages JSONB,                         -- JSON array for damage values
        mana_costs JSONB,                      -- JSON array for mana costs
        gold_costs JSONB,                      -- JSON array for gold costs
        health_costs JSONB,                    -- JSON array for health costs
        special_values JSONB,                  -- JSON array for special values
        is_item BOOLEAN,                       -- Whether the ability is an item
        ability_has_scepter BOOLEAN,           -- Whether the ability has a Scepter upgrade
        ability_has_shard BOOLEAN,             -- Whether the ability has a Shard upgrade
        ability_is_granted_by_scepter BOOLEAN, -- Whether the ability is granted by Scepter
        ability_is_granted_by_shard BOOLEAN,   -- Whether the ability is granted by Shard
        ability_is_innate BOOLEAN,             -- Whether the ability is innate
        item_cost INT,                         -- Item cost
        item_initial_charges INT,              -- Initial charges for items
        item_neutral_tier BIGINT,              -- Neutral tier of the item
        item_stock_max INT,                    -- Maximum item stock
        item_stock_time INT,                   -- Stock time for items
        item_quality INT,                      -- Item quality        
    );

    Additional select column(s): ability_id, name, name_loc.
`;

export const systemMessagePatchNotes= `${systemBaseSqlQuery}

    dota2_patch_notes (
        patch_number VARCHAR(50),              -- The version or identifier of the patch (e.g., "7.32", "7.33")
        patch_name VARCHAR(50),                -- A short, descriptive name for the patch (e.g., "The Great Update")
        patch_timestamp BIGINT,                -- The timestamp (in milliseconds) when the patch was released or applied
        category VARCHAR(50),                  -- The type of changes in the patch (e.g., "Balance", "Bug Fix", "New Feature")
        content JSONB                          -- JSON document containing detailed content of the patch, such as changes, hero adjustments, etc.
    );

    Additional select column(s): patch_number.
`;

// === Examples ===
export const questionExampleHero = [
    "Which hero has the highest base strength?",
    "Top 5 heroes by strength gain.",
    "Which hero has the highest armor?",
    "Which hero has the highest movement speed?",
    "Which hero has the highest turn rate?",
    "Which hero has the highest projectile speed?",
    "Which hero has the highest attack rate?",
    "Which hero has the highest attack range?",
];

export const questionExampleItem = [
    "Which item has the highest money cost?",
    "Top 5 items by mana cost.",
];

export const questionExampleAbility = [
    "Which ability has the highest mana cost?",
];

export const questionExamplePatchNote = [
    "What are the changes in the patch notes for patch 7.30?",
];