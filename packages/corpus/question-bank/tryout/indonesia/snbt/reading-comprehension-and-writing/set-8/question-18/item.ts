import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          isCorrect: false,
          label: "Berdasarkan data, menarik tentang layanan barang hilang.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
