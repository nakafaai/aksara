import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "word-meaning",
  },
  stimulus: "rattan-weaving",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "hilang sama sekali",
        },
        {
          correct: false,
          label: "berkurang sedikit",
        },
        {
          correct: false,
          label: "berpindah tempat",
        },
        {
          correct: false,
          label: "menjadi mahal",
        },
        {
          correct: false,
          label: "berubah bentuk",
        },
      ],
    },
  },
};

export default item;
