import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "um $$24\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$22\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$20\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$12{,}32\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$0\\,\\%$$",
        },
        {
          correct: true,
          label: "um $$15{,}2\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
