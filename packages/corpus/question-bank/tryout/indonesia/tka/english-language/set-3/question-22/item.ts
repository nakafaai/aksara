import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Public organizations should check repairability before replacement.",
        },
        {
          isCorrect: false,
          label: "The passage names three questions for repair decisions.",
        },
        {
          isCorrect: false,
          label: "A damaged cable is one example of a repairable fault.",
        },
        {
          isCorrect: false,
          label: "The decision record includes the estimated repair cost.",
        },
        {
          isCorrect: false,
          label: "Unavailable expertise is identified as a possible risk.",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
