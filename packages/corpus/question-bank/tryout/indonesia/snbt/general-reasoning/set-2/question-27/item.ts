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
          correct: true,
          label: "$$23{,}75\\%$$",
        },
        {
          correct: false,
          label: "$$25\\%$$",
        },
        {
          correct: false,
          label: "$$27{,}5\\%$$",
        },
      ],
    },
  },
};

export default item;
