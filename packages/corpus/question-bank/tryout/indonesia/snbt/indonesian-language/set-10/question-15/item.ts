import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "desain inklusif sebagai ukuran utama dalam uji layanan",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam taman bermain inklusif",
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
          isCorrect: false,
          label: "Uji layanan lokal tanpa keputusan tindak lanjut",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
