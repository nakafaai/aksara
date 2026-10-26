import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          correct: false,
          label:
            "Model mempertimbangkan interaksi cuaca, perilaku pengguna, dan jadwal layanan alih-alih mencari satu penyebab tunggal.",
        },
        {
          correct: false,
          label:
            "Simpulan diberi status sementara sampai pengulangan dengan sampel lebih luas selesai.",
        },
        {
          correct: true,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
        {
          correct: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
      ],
    },
  },
};

export default item;
