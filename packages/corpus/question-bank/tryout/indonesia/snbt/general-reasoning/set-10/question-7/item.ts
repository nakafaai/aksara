import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "membaca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pada semester itu, soal tes membaca diganti dengan soal yang lebih pendek dan lebih mudah.",
        },
        {
          correct: false,
          label:
            "Sebagian besar siswa memilih buku cerita bergambar dari perpustakaan sekolah selama waktu membaca.",
        },
        {
          correct: false,
          label:
            "Kegiatan membaca itu dilakukan di kelas masing-masing, bukan di aula atau di perpustakaan.",
        },
        {
          correct: false,
          label:
            "Program membaca itu dimulai setiap hari pukul 07.00 sebelum pelajaran pertama dimulai.",
        },
        {
          correct: false,
          label:
            "Rata-rata nilai matematika siswa pada akhir semester yang sama tidak berubah dari semester lalu.",
        },
      ],
    },
  },
};

export default item;
