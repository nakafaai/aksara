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
          correct: true,
          label: "Loker Beni berada di kolom $$1$$.",
        },
        {
          correct: false,
          label: "Loker Eli berada di baris atas.",
        },
        {
          correct: false,
          label: "Loker Fajar berada di kolom $$3$$.",
        },
        {
          correct: false,
          label: "Loker Ana berada di kolom $$2$$.",
        },
        {
          correct: false,
          label: "Loker Caca berada di baris bawah.",
        },
      ],
    },
  },
};

export default item;
