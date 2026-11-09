import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "perpustakaan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Koleksi buku perpustakaan keliling bertambah 200 judul baru pada bulan April.",
        },
        {
          correct: false,
          label:
            "Batas peminjaman dinaikkan dari dua menjadi empat buku untuk setiap orang.",
        },
        {
          correct: false,
          label:
            "Mobil perpustakaan keliling diganti dengan mobil baru yang lebih besar.",
        },
        {
          correct: true,
          label:
            "Banyak pengunjung baru hari Sabtu datang untuk membaca di tempat tanpa meminjam buku.",
        },
        {
          correct: false,
          label:
            "Pada hari Selasa pagi, sebagian besar warga keempat desa itu bekerja di sawah atau di pasar.",
        },
      ],
    },
  },
};

export default item;
