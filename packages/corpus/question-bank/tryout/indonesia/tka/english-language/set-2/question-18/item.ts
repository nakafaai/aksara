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
            "Because the first meeting place is meant to replace every evacuation route.",
        },
        {
          isCorrect: false,
          label:
            "Because any place farther away is automatically safer for every household member.",
        },
        {
          isCorrect: false,
          label:
            "Because paper cards can be used only after the household leaves its neighborhood.",
        },
        {
          isCorrect: false,
          label:
            "Because an out-of-area contact cannot receive a message until the household travels farther away.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
