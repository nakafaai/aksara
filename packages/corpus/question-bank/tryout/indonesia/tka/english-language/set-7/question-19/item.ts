import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "repot-plant",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "a list of tools followed by a story about a family garden",
        },
        {
          correct: false,
          label: "a claim about houseplants, several reasons, and a conclusion",
        },
        {
          correct: false,
          label: "a description of different kinds of flower pots",
        },
        {
          correct: false,
          label:
            "the steps first, then the reasons for repotting, then the tools",
        },
        {
          correct: true,
          label:
            "when and why to repot, the things you need, numbered steps, and advice for afterward",
        },
      ],
    },
  },
};

export default item;
