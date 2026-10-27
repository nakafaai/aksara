import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$45\\%$$",
        },
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
          label: "$$55\\%$$",
        },
        {
          correct: true,
          label: "$$47{,}5\\%$$",
        },
      ],
    },
  },
};

export default item;
