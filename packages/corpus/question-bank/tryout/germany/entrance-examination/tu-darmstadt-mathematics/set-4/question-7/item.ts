import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "um $$12\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$20\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$60\\,\\%$$",
        },
        {
          correct: true,
          label: "um $$10\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$6\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$4\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
