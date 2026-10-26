import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim merubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          correct: true,
          label:
            "Tim mengubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          correct: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          correct: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
        {
          correct: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu pemakaian jadwal digital yang langsung diperbarui setelah pembatalan.",
        },
      ],
    },
  },
};

export default item;
