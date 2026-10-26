import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paket itu menggunakan cara penyegelan yang berbeda dari Kelompok A.",
        },
        {
          correct: false,
          label:
            "Paket itu memiliki semua ciri yang sama dengan paket dalam Kelompok A.",
        },
        {
          correct: false,
          label:
            "Paket itu memiliki nomor seri yang sama dengan paket dalam Kelompok A.",
        },
        {
          correct: true,
          label:
            "Paket itu menggunakan cara penyegelan yang sama dengan paket dalam Kelompok A.",
        },
        {
          correct: false,
          label:
            "Paket itu telah melalui pemeriksaan yang sama dengan paket dalam Kelompok A.",
        },
      ],
    },
  },
};

export default item;
