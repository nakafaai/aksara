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
          isCorrect: false,
          label: "The passage lists three initial checking steps.",
        },
        {
          isCorrect: false,
          label: "Medical advice is named as a higher-risk example.",
        },
        {
          isCorrect: true,
          label:
            "Treating source checking as a task only for language or computer classes is unrealistic.",
        },
        {
          isCorrect: false,
          label: "Geography is mentioned in the fourth paragraph.",
        },
        {
          isCorrect: false,
          label: "The routine includes a stopping rule.",
        },
      ],
    },
  },
  stimulusKey: "source-checking",
};

export default item;
