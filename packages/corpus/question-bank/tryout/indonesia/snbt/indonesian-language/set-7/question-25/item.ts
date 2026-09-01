import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengganti Petugas Klinik dengan Kartu Bergambar",
        },
        {
          isCorrect: false,
          label: "Empat Tahap yang Berlaku bagi Setiap Pasien",
        },
        {
          isCorrect: true,
          label: "Dari Salah Meja ke Kartu Teruji: Literasi Kesehatan Arum",
        },
        {
          isCorrect: false,
          label: "Literasi Kesehatan sebagai Kemampuan Membaca Nomor Meja",
        },
        {
          isCorrect: false,
          label: "Panah Lantai sebagai Penyebab Tunggal Kesalahan Pasien",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
