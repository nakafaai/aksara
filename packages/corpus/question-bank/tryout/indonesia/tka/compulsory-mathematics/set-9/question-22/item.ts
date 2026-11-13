import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "saudara",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Banyak siswa yang mempunyai lebih dari $$3$$ saudara kandung sama dengan banyak siswa yang mempunyai kurang dari $$3$$ saudara kandung.",
        },
        {
          correct: true,
          label: "Jangkauan antarkuartil data banyak saudara kandung adalah $$3$$.",
        },
        {
          correct: true,
          label:
            "Median data banyak saudara kandung lebih besar daripada rata-rata banyak saudara kandung seluruh siswa.",
        },
        {
          correct: false,
          label:
            "Rata-rata banyak saudara kandung siswa yang mempunyai paling sedikit $$3$$ saudara kandung lebih dari $$4$$.",
        },
        {
          correct: true,
          label:
            "Jika anak tunggal tidak diikutkan dalam data, median dan modus banyak saudara kandung tidak berubah.",
        },
      ],
    },
  },
};

export default item;
