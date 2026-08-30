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
            "A secondary school should test a later start time for one term.",
        },
        {
          isCorrect: false,
          label: "The proposal mentions attendance and late arrivals.",
        },
        {
          isCorrect: false,
          label: "The passage gives sibling care as one example.",
        },
        {
          isCorrect: false,
          label: "The trial is described as reversible.",
        },
        {
          isCorrect: false,
          label: "Several routines are named in the second paragraph.",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
