import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dengan aturan ukur yang sama, tim merencanakan uji label foto yang lebih panjang serta pemisahan data peminjam baru dan lama.",
        },
        {
          isCorrect: false,
          label:
            "Dengan aturan ukur yang diubah, tim merencanakan uji label foto yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi label foto yang menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan label foto secara permanen sebagai pengganti uji lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji lebih panjang dengan menggabungkan data peminjam baru dan lama tanpa membedakannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
