import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Dua Puluh Empat Lampu yang Pasti Menyala Setiap Malam",
        },
        {
          correct: false,
          label: "Tiga Buku Harian sebagai Suara Seluruh Kampung",
        },
        {
          correct: true,
          label: "Membaca Peta Lampu dan Pengalaman Malam Warga",
        },
        {
          correct: false,
          label: "Mengapa Peta Resmi Tidak Berguna bagi Sejarah",
        },
        {
          correct: false,
          label: "Penerangan yang Merata di Semua Jalan Kampung",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
