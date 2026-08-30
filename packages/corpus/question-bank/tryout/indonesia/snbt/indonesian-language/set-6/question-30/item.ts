import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kepastian Mutlak tentang ruang penyimpanan karya seni pada malam hari",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam ruang penyimpanan karya seni pada malam hari",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap sudut pandang terbatas di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label:
            "Satu Aturan untuk Setiap ruang penyimpanan karya seni pada malam hari",
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
