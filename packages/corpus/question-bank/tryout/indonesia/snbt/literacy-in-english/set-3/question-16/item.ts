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
          label:
            "It was the oldest known example of Egyptian writing ever found.",
        },
        {
          correct: false,
          label:
            "It explained in Greek exactly how each hieroglyph should be pronounced.",
        },
        {
          correct: false,
          label:
            "It showed every hieroglyphic sign together with a picture of its meaning.",
        },
        {
          correct: true,
          label:
            "It gave the same decree in hieroglyphs and in readable Greek.",
        },
        {
          correct: false,
          label:
            "It was found inside a temple that Champollion had studied for years.",
        },
      ],
    },
  },
};

export default item;
