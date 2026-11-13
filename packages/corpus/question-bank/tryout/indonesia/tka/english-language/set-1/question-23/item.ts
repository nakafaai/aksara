import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "weekend",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Weekend practice should not count toward a student's grade.",
        },
        {
          correct: false,
          label: "A weekend with nothing due will leave many students idle.",
        },
        {
          correct: false,
          label: "Students without a quiet place at home are graded unfairly.",
        },
        {
          correct: true,
          label: "Short, regular practice works better than one long session.",
        },
        {
          correct: false,
          label:
            "Weekend assignments arrive late more often than weekday ones.",
        },
      ],
    },
  },
};

export default item;
