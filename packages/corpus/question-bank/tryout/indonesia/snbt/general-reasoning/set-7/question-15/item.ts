import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$72$$ der überlebenden Setzlinge bildeten neue Blätter.",
        },
        {
          isCorrect: false,
          label: "Alle $$120$$ Tomatensetzlinge überlebten den ersten Monat.",
        },
        {
          isCorrect: false,
          label: "Alle $$96$$ überlebenden Setzlinge bildeten neue Blätter.",
        },
        {
          isCorrect: false,
          label:
            "Der Bericht bewies, dass die überlebenden Setzlinge krankheitsfrei waren.",
        },
        {
          isCorrect: false,
          label:
            "Die überlebenden Setzlinge trugen mehr Früchte als die übrigen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$72$$ of the surviving seedlings produced new leaves.",
        },
        {
          isCorrect: false,
          label: "All $$120$$ tomato seedlings survived the first month.",
        },
        {
          isCorrect: false,
          label: "All $$96$$ surviving seedlings produced new leaves.",
        },
        {
          isCorrect: false,
          label:
            "The report proved that the surviving seedlings were disease-free.",
        },
        {
          isCorrect: false,
          label: "The surviving seedlings produced more fruit than the others.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Sebanyak $$72$$ bibit yang bertahan hidup menghasilkan daun baru.",
        },
        {
          isCorrect: false,
          label:
            "Seluruh $$120$$ bibit tomat bertahan hidup selama bulan pertama.",
        },
        {
          isCorrect: false,
          label:
            "Seluruh $$96$$ bibit yang bertahan hidup menghasilkan daun baru.",
        },
        {
          isCorrect: false,
          label:
            "Laporan membuktikan bahwa bibit yang bertahan bebas dari penyakit.",
        },
        {
          isCorrect: false,
          label:
            "Bibit yang bertahan menghasilkan lebih banyak buah daripada bibit lainnya.",
        },
      ],
    },
  },
};

export default item;
