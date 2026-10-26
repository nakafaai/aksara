import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$32\\%$$",
        },
        {
          correct: true,
          label: "$$36\\%$$",
        },
        {
          correct: false,
          label: "$$34\\%$$",
        },
        {
          correct: false,
          label: "$$38\\%$$",
        },
        {
          correct: false,
          label: "$$40\\%$$",
        },
      ],
    },
  },
};

export default item;
