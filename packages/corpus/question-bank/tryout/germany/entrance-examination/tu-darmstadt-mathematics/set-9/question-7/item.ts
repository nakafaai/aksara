import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "um $$35\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$30\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$72\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$20\\,\\%$$",
        },
        {
          correct: false,
          label: "um $$25\\,\\%$$",
        },
        {
          correct: true,
          label: "um $$28\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
