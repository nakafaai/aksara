import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "shoe-sizes",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rata-rata ukuran sepatu kurang dari mediannya.",
        },
        {
          correct: true,
          label: "Jangkauan antarkuartilnya adalah $$2$$.",
        },
        {
          correct: true,
          label:
            "Lebih dari separuh siswa memakai sepatu berukuran $$39$$ atau $$40$$.",
        },
        {
          correct: true,
          label: "Modus data sama dengan mediannya.",
        },
        {
          correct: false,
          label: "Rata-rata ukuran sepatu lebih dari $$39{,}5$$.",
        },
      ],
    },
  },
};

export default item;
