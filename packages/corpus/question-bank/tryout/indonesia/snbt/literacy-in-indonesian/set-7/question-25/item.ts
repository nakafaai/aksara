import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mengganti Petugas Klinik dengan Kartu Bergambar",
        },
        {
          correct: false,
          label: "Empat Tahap yang Berlaku bagi Setiap Pasien",
        },
        {
          correct: true,
          label:
            "Dari Salah Meja ke Kartu yang Diperiksa: Literasi Kesehatan Arum",
        },
        {
          correct: false,
          label: "Literasi Kesehatan sebagai Kemampuan Membaca Nomor Meja",
        },
        {
          correct: false,
          label: "Panah Lantai sebagai Penyebab Tunggal Kesalahan Pasien",
        },
      ],
    },
  },
};

export default item;
