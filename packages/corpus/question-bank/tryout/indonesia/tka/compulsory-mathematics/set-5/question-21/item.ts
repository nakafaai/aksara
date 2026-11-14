import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "klub",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$15\\%$$",
        },
        {
          correct: false,
          label: "$$17{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$35\\%$$",
        },
        {
          correct: false,
          label: "$$60\\%$$",
        },
      ],
    },
  },
};

export default item;
