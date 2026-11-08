import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\,\\%$$",
        },
        {
          correct: false,
          label: "$$27{,}5\\,\\%$$",
        },
        {
          correct: true,
          label: "$$30\\,\\%$$",
        },
        {
          correct: false,
          label: "$$50\\,\\%$$",
        },
        {
          correct: false,
          label: "$$55\\,\\%$$",
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
