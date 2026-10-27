import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "grade-distribution",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1130$$",
        },
        {
          correct: false,
          label: "$$1150$$",
        },
        {
          correct: true,
          label: "$$1170$$",
        },
        {
          correct: false,
          label: "$$1190$$",
        },
        {
          correct: false,
          label: "$$1210$$",
        },
      ],
    },
  },
};

export default item;
