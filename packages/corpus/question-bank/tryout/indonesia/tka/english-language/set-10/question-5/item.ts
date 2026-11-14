import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "hill-observatory",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The club was founded by three science teachers.",
        },
        {
          correct: true,
          label:
            "Visitors are also asked not to use the flash on their cameras.",
        },
        {
          correct: false,
          label: "The Moon is about 384,000 kilometers from the Earth.",
        },
        {
          correct: false,
          label:
            "The classroom chairs can be folded and stacked against the wall.",
        },
        {
          correct: false,
          label: "The observatory has been closed for repairs since last year.",
        },
      ],
    },
  },
};

export default item;
