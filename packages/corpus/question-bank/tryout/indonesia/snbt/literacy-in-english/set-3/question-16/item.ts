import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "rosetta-stone",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It was the oldest known example of Egyptian writing.",
        },
        {
          correct: false,
          label: "It explained in Greek how hieroglyphs should be pronounced.",
        },
        {
          correct: false,
          label:
            "It showed every hieroglyphic sign together with a picture of its meaning.",
        },
        {
          correct: true,
          label:
            "It carried the same decree in hieroglyphs and in Greek, which could be read.",
        },
        {
          correct: false,
          label:
            "It was found inside a temple that Champollion had already studied.",
        },
      ],
    },
  },
};

export default item;
