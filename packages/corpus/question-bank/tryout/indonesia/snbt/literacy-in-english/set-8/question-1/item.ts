import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "evidence-status",
  },
  stimulus: "phineas-gage",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Harlow's 1868 report described Gage getting into fights and drinking heavily.",
        },
        {
          column: 1,
          label:
            "The textbook story and the years in Chile cannot both be true of the whole of Gage's later life.",
        },
        {
          column: 2,
          label:
            "The passage shows that the front of the brain has nothing to do with personality.",
        },
        {
          column: 1,
          label:
            "The changes Harlow reported may describe only the period soon after the accident.",
        },
        {
          column: 2,
          label: "Gage died within a few months of the accident.",
        },
      ],
    },
  },
};

export default item;
