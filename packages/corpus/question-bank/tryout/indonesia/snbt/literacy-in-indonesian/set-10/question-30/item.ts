import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tiga Puluh Dua Lampu yang Pasti Menyala",
        },
        {
          isCorrect: false,
          label: "Perdebatan Pak Udin dan Bu Sari di Dekat Jembatan",
        },
        {
          isCorrect: false,
          label: "Kepala Kantor dan Peta Bersih yang Selesai",
        },
        {
          isCorrect: true,
          label: "Peta Berlapis untuk Cahaya yang Berubah",
        },
        {
          isCorrect: false,
          label: "Gang Gelap yang Tidak Pernah Diperiksa",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
