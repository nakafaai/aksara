import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Nearby streets may be closed during the same emergency.",
        },
        {
          isCorrect: false,
          label:
            "Choose the second meeting place without checking whether the first remains reachable.",
        },
        {
          isCorrect: false,
          label:
            "The second meeting place should be in another town even if children cannot reach it independently.",
        },
        {
          isCorrect: false,
          label:
            "Paper cards are mainly useful after family members have left the neighborhood.",
        },
        {
          isCorrect: false,
          label:
            "The second location is needed because the out-of-area contact cannot send messages to local numbers.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
