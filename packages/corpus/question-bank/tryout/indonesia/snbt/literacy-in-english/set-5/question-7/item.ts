import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "basic-income",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Recipients in the Finnish pilot reported less stress than a comparison group.",
        },
        {
          column: 1,
          label:
            "Employers might lower wages if every adult received the payment.",
        },
        {
          column: 2,
          label:
            "Pilots have shown that recipients stop working once payments begin.",
        },
        {
          column: 2,
          label:
            "The taxes a universal scheme would need have already been tested in pilots.",
        },
      ],
    },
  },
};

export default item;
