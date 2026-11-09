import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "reading-books",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jangkauan datanya adalah $$8$$.",
        },
        {
          correct: true,
          label: "Rata-rata banyak buku yang dibaca adalah $$2{,}24$$.",
        },
        {
          correct: false,
          label: "Lebih dari separuh siswa membaca paling sedikit $$3$$ buku.",
        },
        {
          correct: true,
          label: "Modus data sama dengan mediannya.",
        },
        {
          correct: true,
          label:
            "Persentase siswa yang tidak membaca buku sama sekali adalah $$8\\,\\%$$.",
        },
      ],
    },
  },
};

export default item;
