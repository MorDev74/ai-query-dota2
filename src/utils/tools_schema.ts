export const tools = [
  {
    "type": "function",
    "function": {
      "name": "toolQueryHeroData",
      "description": "This function queries only the hero data itself based on the provided LLM model name and question. The function uses the LLM to convert the question into an SQL query based on the hero data table structure, and then retrieves only the data directly related to the hero from the database in a structured format.",
      "parameters": {
        "type": "object",
        "properties": {
          "modelName": {
            "type": "string",
            "description": "The name of the LLM model to query the hero data."
          },
          "question": {
            "type": "string",
            "description": "The question or criteria used to query the hero data."
          }
        },
        "required": ["modelName", "question"],
        "additionalProperties": false
      },
      "returns": {
        "type": "array",
        "items": {
          "type": "object",
          "description": "Each item in the result array contains the hero data based on the query."
        }
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "toolQueryAbilityData",
      "description": "This function queries ability data based on the provided LLM model name and question. The function uses the LLM to convert the question into an SQL query based on the ability data table structure, retrieving only data directly related to abilities from the database in a structured format.",
      "parameters": {
        "type": "object",
        "properties": {
          "modelName": {
            "type": "string",
            "description": "The name of the LLM model to query the ability data."
          },
          "question": {
            "type": "string",
            "description": "The question or criteria used to query the ability data."
          }
        },
        "required": ["modelName", "question"],
        "additionalProperties": false
      },
      "returns": {
        "type": "array",
        "items": {
          "type": "object",
          "description": "Each item in the result array contains the ability data based on the query."
        }
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "toolQueryItemData",
      "description": "This function queries item data based on the provided LLM model name and question. The function uses the LLM to convert the question into an SQL query based on the item data table structure, retrieving only data directly related to items from the database in a structured format.",
      "parameters": {
        "type": "object",
        "properties": {
          "modelName": {
            "type": "string",
            "description": "The name of the LLM model to query the item data."
          },
          "question": {
            "type": "string",
            "description": "The question or criteria used to query the item data."
          }
        },
        "required": ["modelName", "question"],
        "additionalProperties": false
      },
      "returns": {
        "type": "array",
        "items": {
          "type": "object",
          "description": "Each item in the result array contains the item data based on the query."
        }
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "toolQueryPatchNoteData",
      "description": "This function queries patch note data based on the provided LLM model name and question. The function uses the LLM to convert the question into an SQL query based on the patch note data table structure, retrieving only data directly related to patch notes from the database in a structured format.",
      "parameters": {
        "type": "object",
        "properties": {
          "modelName": {
            "type": "string",
            "description": "The name of the LLM model to query the patch note data."
          },
          "question": {
            "type": "string",
            "description": "The question or criteria used to query the patch note data."
          }
        },
        "required": ["modelName", "question"],
        "additionalProperties": false
      },
      "returns": {
        "type": "array",
        "items": {
          "type": "object",
          "description": "Each item in the result array contains the patch note data based on the query."
        }
      }
    }
  },
];