import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Provide quiet writing time.",
        },
        {
          isCorrect: true,
          label: "Invite someone who has not spoken.",
        },
        {
          isCorrect: true,
          label: "Allow an invited person to pass.",
        },
        {
          isCorrect: false,
          label:
            "Prioritize speakers who can respond immediately so the discussion keeps moving.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
