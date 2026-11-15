import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "indigo-dye",
  versions: {
    en: {
      columns: [
        "Follows the instructions",
        "Breaks the instructions",
        "Not covered",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Mixing $$250$$ grams of paste into a fresh bath",
        },
        {
          column: 1,
          label:
            "Stirring another $$25$$ grams of paste into the bath before the fourth cloth goes in",
        },
        {
          column: 1,
          label:
            "Giving a cloth $$6$$ rounds of a $$5$$-minute dip and a $$15$$-minute airing to make it dark blue",
        },
        {
          column: 2,
          label:
            "Giving a cloth $$4$$ dips of $$5$$ minutes one after another, then one airing of $$60$$ minutes",
        },
        {
          column: 3,
          label: "Adding a spoonful of salt to the bath",
        },
        {
          column: 2,
          label:
            "Rinsing the cloth in cold water with vinegar on the same day as its last round",
        },
      ],
    },
  },
};

export default item;
