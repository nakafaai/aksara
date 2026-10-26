import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mantel M-17 yang Pasti Bertahan Selama Dua Puluh Satu Tahun",
        },
        {
          correct: true,
          label: "Menelusuri Mantel Teater melalui Foto dan Catatan Perawatan",
        },
        {
          correct: false,
          label: "Mengisi Celah Arsip dengan Kemiripan Visual",
        },
        {
          correct: false,
          label: "Buku Perawatan sebagai Bukti Lengkap Penggunaan Panggung",
        },
        {
          correct: false,
          label: "Foto Publikasi yang Lebih Netral daripada Catatan Internal",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
