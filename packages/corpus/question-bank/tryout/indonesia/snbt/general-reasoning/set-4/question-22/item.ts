import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\%$$",
        },
        {
          correct: false,
          label: "$$22{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$27{,}5\\%$$",
        },
        {
          correct: false,
          label: "$$30\\%$$",
        },
        {
          correct: true,
          label: "$$25\\%$$",
        },
      ],
    },
  },
};

export default item;
