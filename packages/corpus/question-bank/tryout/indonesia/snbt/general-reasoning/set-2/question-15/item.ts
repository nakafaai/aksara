import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "arrangement",
  },
  stimulus: "loker",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Loker Ana berada di kolom $$2$$.",
        },
        {
          correct: false,
          label: "Loker Eli berada di kolom $$3$$.",
        },
        {
          correct: false,
          label: "Loker Doni berada tepat di bawah loker Fajar.",
        },
        {
          correct: false,
          label: "Loker Beni berada di baris atas.",
        },
        {
          correct: true,
          label: "Loker Caca berada di baris atas.",
        },
      ],
    },
  },
};

export default item;
