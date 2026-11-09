import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "information-validity",
  },
  stimulus: "flood-kitchen",
  versions: {
    en: {
      columns: ["Supported", "Not supported"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Volunteers had packed four hundred boxes by noon.",
        },
        { column: 2, label: "The writer cooked rice in huge pots." },
        { column: 1, label: "The water went down on the third day." },
        { column: 2, label: "Pak Yusuf said that masks were not necessary." },
      ],
    },
  },
};

export default item;
