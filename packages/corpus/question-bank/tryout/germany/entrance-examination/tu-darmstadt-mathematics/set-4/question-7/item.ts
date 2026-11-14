import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "um $$5\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$20\\,\\%$$",
        },
        {
          correct: true,
          label: "um $$25\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$45\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$80\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$125\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
