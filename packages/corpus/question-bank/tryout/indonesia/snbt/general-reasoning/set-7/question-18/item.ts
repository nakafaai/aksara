import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Paket itu menggunakan cara penyegelan yang berbeda dari Kelompok A.",
        },
        {
          isCorrect: false,
          label:
            "Paket itu memiliki semua ciri yang sama dengan paket dalam Kelompok A.",
        },
        {
          isCorrect: false,
          label:
            "Paket itu memiliki nomor seri yang sama dengan paket dalam Kelompok A.",
        },
        {
          isCorrect: true,
          label:
            "Paket itu menggunakan cara penyegelan yang sama dengan paket dalam Kelompok A.",
        },
        {
          isCorrect: false,
          label:
            "Paket itu telah melalui pemeriksaan yang sama dengan paket dalam Kelompok A.",
        },
      ],
    },
  },
};

export default item;
