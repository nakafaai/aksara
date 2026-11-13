import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "weekend",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Last semester, $$31\\%$$ of weekend assignments arrived late or incomplete.",
        },
        {
          correct: false,
          label:
            "Even he agrees with Ms Hartono, though, that short, regular practice beats one long session.",
        },
        {
          correct: false,
          label:
            "Every Friday at SMA Tunas Bangsa, students leave with graded assignments due on Monday morning.",
        },
        {
          correct: true,
          label: "It is the only fair way to treat weekend learning.",
        },
        {
          correct: false,
          label:
            "Students who missed a weekend deadline had, on average, the same end-of-unit test scores as students who met it.",
        },
      ],
    },
  },
};

export default item;
