import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "city-birdsong",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Traffic noise is concentrated at low frequencies.",
        },
        {
          column: 1,
          label:
            "Singing louder or at night uses time that could be spent feeding.",
        },
        {
          column: 2,
          label:
            "In the robin study, street lighting predicted night singing better than daytime noise.",
        },
        {
          column: 2,
          label:
            "During the 2020 lockdowns, white-crowned sparrows in San Francisco sang more loudly.",
        },
      ],
    },
  },
};

export default item;
