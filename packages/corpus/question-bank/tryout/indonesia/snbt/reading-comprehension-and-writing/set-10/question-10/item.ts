import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji lebih lama dengan aturan pengukuran yang diubah.",
        },
        {
          isCorrect: false,
          label: "Tim akan mengulang hanya pertemuan dengan hasil tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Tim merencanakan uji lebih lama dengan resep lebih beragam dan aturan pengukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan susunan baru secara permanen sebagai pengganti uji lanjutan.",
        },
        {
          isCorrect: false,
          label: "Tim merencanakan uji lebih lama dengan resep yang sama saja.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
