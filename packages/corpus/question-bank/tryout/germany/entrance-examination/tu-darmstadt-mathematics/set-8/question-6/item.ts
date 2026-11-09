import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "für alle $$k<2$$",
        },
        {
          correct: false,
          label: "für alle $$k>-2$$",
        },
        {
          correct: false,
          label: "nur für $$k=2$$",
        },
        {
          correct: true,
          label: "für alle $$k>2$$",
        },
        {
          correct: false,
          label: "für alle $$k\\ge2$$",
        },
        {
          correct: false,
          label: "für alle $$k<-2$$",
        },
      ],
    },
  },
};

export default item;
