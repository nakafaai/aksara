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
          label:
            "sudut pandang terbatas sebagai istilah tanpa peran dalam cerita",
        },
        {
          isCorrect: false,
          label: "Akhir yang menghapus ketegangan makna benda",
        },
        {
          isCorrect: true,
          label:
            "Kartu kondisi di ruang penyimpanan karya seni pada malam hari",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
