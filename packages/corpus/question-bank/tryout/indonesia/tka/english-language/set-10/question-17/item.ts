import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  stimulus: "chili-seedlings",
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
          label:
            "Putting the first row $$35$$ cm in from the long edge of the bed",
        },
        {
          column: 1,
          label:
            "Giving a bed of $$36$$ seedlings $$18$$ litres in all each morning in the dry season",
        },
        {
          column: 1,
          label: "Putting $$9$$ seedlings along a row $$4$$ m long",
        },
        {
          column: 3,
          label: "Covering the soil between the plants with rice straw",
        },
        {
          column: 2,
          label:
            "Giving a bed of $$36$$ seedlings $$18$$ litres in all each morning outside the dry season",
        },
        {
          column: 1,
          label: "Taking the palm-leaf shade off on the fourth morning",
        },
      ],
    },
  },
};

export default item;
