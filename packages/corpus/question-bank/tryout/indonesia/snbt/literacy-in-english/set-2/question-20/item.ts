import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "jikji-printing",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The first example of a technology is always the one that became most widely used.",
        },
        {
          correct: false,
          label:
            "A record of an object is as reliable as the object itself when deciding which came first.",
        },
        {
          correct: true,
          label:
            "A claim to be first depends on surviving evidence and may change with new finds.",
        },
        {
          correct: false,
          label:
            "Historians should stop trying to identify the earliest examples of inventions.",
        },
        {
          correct: false,
          label:
            "Objects held outside their country of origin cannot be counted as historical firsts.",
        },
      ],
    },
  },
};

export default item;
