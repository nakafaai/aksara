import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          isCorrect: false,
          label:
            "Model mempertimbangkan interaksi cuaca, perilaku pengguna, dan jadwal layanan alih-alih mencari satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan diberi status sementara sampai pengulangan dengan sampel lebih luas selesai.",
        },
        {
          isCorrect: true,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
      ],
    },
  },
};

export default item;
