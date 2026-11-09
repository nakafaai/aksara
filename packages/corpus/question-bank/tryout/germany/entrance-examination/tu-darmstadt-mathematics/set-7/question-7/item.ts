import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "um $$33\\tfrac13\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$66\\tfrac23\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$60\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$150\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$1{,}5\\,\\%$$",
        },
        {
          correct: true,
          label: "um $$50\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
