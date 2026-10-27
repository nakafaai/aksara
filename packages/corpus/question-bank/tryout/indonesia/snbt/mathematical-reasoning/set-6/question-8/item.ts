import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$175$$ cm",
        },
        {
          correct: false,
          label: "$$192$$ cm",
        },
        {
          correct: false,
          label: "$$221$$ cm",
        },
        {
          correct: true,
          label: "$$189$$ cm",
        },
        {
          correct: false,
          label: "$$235$$ cm",
        },
      ],
    },
  },
};

export default item;
