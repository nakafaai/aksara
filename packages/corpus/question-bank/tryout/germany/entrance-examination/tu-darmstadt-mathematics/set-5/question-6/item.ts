import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$15\\,\\%$$",
        },
        {
          correct: false,
          label: "$$20\\,\\%$$",
        },
        {
          correct: true,
          label: "$$35\\,\\%$$",
        },
        {
          correct: false,
          label: "$$37{,}5\\,\\%$$",
        },
        {
          correct: false,
          label: "$$40\\,\\%$$",
        },
        {
          correct: false,
          label: "$$75\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
