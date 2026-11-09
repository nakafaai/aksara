import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "jikji-printing",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Both volumes of *Jikji* are kept at the National Library of France.",
        },
        {
          column: 1,
          label: "Bi Sheng made his movable type from baked clay.",
        },
        {
          column: 2,
          label:
            "The passage states that the metal-type book from about 1234 is kept in a Korean museum.",
        },
        {
          column: 1,
          label: "*Jikji* was printed before Gutenberg's Bible.",
        },
      ],
    },
  },
};

export default item;
