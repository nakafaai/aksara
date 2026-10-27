import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50\\%$$",
        },
        {
          correct: false,
          label: "$$52{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$57{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$60\\%$$",
        },
        {
          correct: true,
          label: "$$55\\%$$",
        },
      ],
    },
  },
};

export default item;
