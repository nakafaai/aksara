import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Benda berulang yang tetap menjadi bagian latar",
        },
        {
          isCorrect: false,
          label: "Konflik yang selesai sebelum pilihan akhir tokoh",
        },
        {
          isCorrect: false,
          label: "perkembangan tokoh sebagai istilah tanpa peran dalam cerita",
        },
        {
          isCorrect: true,
          label: "Pembatas buku kosong di klub pembaca pemula",
        },
        {
          isCorrect: false,
          label: "Akhir yang menghapus ketegangan makna benda",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
