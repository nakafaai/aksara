import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "um $$25\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$75\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$80\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$12{,}5\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$33\\tfrac13\\,\\%$$",
        },
        {
          correct: true,
          label: "um $$20\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
