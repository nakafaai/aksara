import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "dukungan sebaya sebagai ukuran utama dalam uji layanan",
        },
        {
          isCorrect: false,
          label: "Dari perbandingan singkat menuju perubahan layanan tetap",
        },
        {
          isCorrect: false,
          label: "Konsultasi tanpa pengukuran hasil yang dapat dibandingkan",
        },
        {
          isCorrect: true,
          label: "Kartu Tujuan dalam Dukungan Sebaya: Uji Dua Minggu",
        },
        {
          isCorrect: false,
          label: "Uji layanan lokal tanpa keputusan tindak lanjut",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
