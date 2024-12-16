export const URL_IMAGE_HERO="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/heroes/"
export const URL_IMAGE_ABILITY="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/abilities/"
export const URL_IMAGE_ITEM="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/items/"
export const URL_IMAGE_UNIT="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/units/"
export const URL_IMAGE_ICON="https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/icons/"

export const URL_PATCH_NOTES="https://www.dota2.com/datafeed/patchnoteslist?language=English"
export const URL_PATCH_NOTE="https://www.dota2.com/datafeed/patchnotes?language=English&version="
export const FILE_PATCH_NOTES="patch_notes.json"

export const URL_ITEMS="https://www.dota2.com/datafeed/itemlist?language=English"
export const URL_ITEM="https://www.dota2.com/datafeed/itemdata?language=english&item_id="
export const FILE_ITEMS="items.json"

export const URL_HEROES="https://www.dota2.com/datafeed/herolist?language=English"
export const URL_HERO="https://www.dota2.com/datafeed/herodata?language=english&hero_id="
export const FILE_HEROES="heroes.json"

export const URL_ABILITY_LIST="https://www.dota2.com/datafeed/abilitylist?language=english"
export const URL_ABILITY="https://www.dota2.com/datafeed/abilitydata?language=English&ability_id="
export const FILE_ABILITY_LIST="ability_list.json"


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

export const systemMessageItem= `You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
    DOTA2Item (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        name_loc TEXT NOT NULL,
    );

    Only retrieval queries are allowed.
`;

export const systemMessageAbility= `You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
    DOTA2Ability (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        name_loc TEXT NOT NULL,
    );

    Only retrieval queries are allowed.
`;

export const systemMessagePatchNote= `You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
    DOTA2PatchNote (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        name_loc TEXT NOT NULL,
    );

    Only retrieval queries are allowed.
`;

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