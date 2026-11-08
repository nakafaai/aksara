import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "travel-time",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Median data terletak pada kelas $$15$$ sampai $$19$$.",
        },
        {
          correct: true,
          label:
            "Rata-rata lama perjalanan, dihitung dengan titik tengah kelas, lebih dari $$17$$ menit.",
        },
        {
          correct: false,
          label: "Modus data terletak pada kelas $$20$$ sampai $$24$$.",
        },
        {
          correct: false,
          label:
            "Lebih dari separuh siswa memerlukan kurang dari $$15$$ menit.",
        },
        {
          correct: true,
          label: "Kuartil bawah data terletak pada kelas $$10$$ sampai $$14$$.",
        },
      ],
    },
  },
};

export default item;
