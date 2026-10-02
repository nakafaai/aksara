import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Satu Usia Aman untuk Gawai Pertama Anak.",
        },
        {
          isCorrect: false,
          label: "Mengapa Semua Waktu Layar Berbahaya.",
        },
        {
          isCorrect: false,
          label: "Cara Membeli Ponsel Pertama Anak.",
        },
        {
          isCorrect: false,
          label: "Aturan Satu Jam untuk Setiap Anggota Keluarga.",
        },
        {
          isCorrect: true,
          label: "Penggunaan Media Keluarga Sesuai Usia.",
        },
      ],
    },
  },
};

export default item;
