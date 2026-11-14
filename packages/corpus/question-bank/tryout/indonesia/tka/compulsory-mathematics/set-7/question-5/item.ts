import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Banyak tiket dewasa yang dibeli adalah bilangan ganjil.",
        },
        {
          correct: false,
          label: "Banyak tiket anak lebih banyak daripada banyak tiket dewasa.",
        },
        {
          correct: false,
          label: "Banyak seluruh tiket yang dibeli adalah $$8$$.",
        },
        {
          correct: false,
          label: "Banyak tiket dewasa yang dibeli lebih dari $$2$$.",
        },
        {
          correct: false,
          label: "Banyak tiket anak yang dibeli adalah bilangan genap.",
        },
      ],
    },
  },
};

export default item;
