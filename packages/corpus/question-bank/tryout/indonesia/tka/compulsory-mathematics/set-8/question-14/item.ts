import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "titik $$A$$",
        },
        {
          correct: false,
          label: "titik $$B$$",
        },
        {
          correct: false,
          label: "titik $$C$$",
        },
        {
          correct: true,
          label: "titik $$D$$",
        },
        {
          correct: false,
          label: "titik $$E$$",
        },
      ],
    },
  },
};

export default item;
