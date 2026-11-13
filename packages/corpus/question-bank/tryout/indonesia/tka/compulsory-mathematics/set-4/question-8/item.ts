import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "algebra",
    topic: "sequences-series",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "hari ke-$$22$$",
        },
        {
          correct: false,
          label: "hari ke-$$25$$",
        },
        {
          correct: true,
          label: "hari ke-$$26$$",
        },
        {
          correct: false,
          label: "hari ke-$$29$$",
        },
        {
          correct: false,
          label: "hari ke-$$50$$",
        },
      ],
    },
  },
};

export default item;
