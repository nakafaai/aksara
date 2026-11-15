import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "mozart-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Students who heard Mozart did better on the task than students who heard nothing at all.",
        },
        {
          correct: true,
          label:
            "Students who heard Mozart did better than students who heard an equally lively piece by another composer, even though both groups felt equally alert and cheerful.",
        },
        {
          correct: false,
          label:
            "The improvement after Mozart was larger than the improvement after drinking a cup of coffee.",
        },
        {
          correct: false,
          label:
            "Students who heard a lively Mozart piece did better than students who heard a slow, sad Mozart piece.",
        },
        {
          correct: false,
          label:
            "A review that pooled dozens of studies found the average effect to be small.",
        },
      ],
    },
  },
};

export default item;
