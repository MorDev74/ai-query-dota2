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