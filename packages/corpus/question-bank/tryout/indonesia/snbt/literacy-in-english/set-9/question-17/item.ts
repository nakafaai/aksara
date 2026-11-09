import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "braille-code",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Louis Braille was born blind.",
        },
        {
          column: 2,
          label:
            "The school adopted Braille's system officially while he was still alive.",
        },
        {
          column: 1,
          label: "Pupils could not write using the raised-letter books.",
        },
        {
          column: 1,
          label: "Braille published his system in 1829.",
        },
      ],
    },
  },
};

export default item;
