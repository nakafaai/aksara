import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Satu Usia Aman untuk Gawai Pertama Anak.",
        },
        {
          correct: false,
          label: "Mengapa Semua Waktu Layar Berbahaya.",
        },
        {
          correct: false,
          label: "Cara Membeli Ponsel Pertama Anak.",
        },
        {
          correct: false,
          label: "Aturan Satu Jam untuk Setiap Anggota Keluarga.",
        },
        {
          correct: true,
          label: "Penggunaan Media Keluarga Sesuai Usia.",
        },
      ],
    },
  },
};

export default item;
