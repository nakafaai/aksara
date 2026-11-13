import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "tenun",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Urutan belajar yang dimulai dari karya kecil membuat kelas menenun menarik lebih banyak remaja karena karyanya cepat selesai.",
        },
        {
          correct: true,
          label:
            "Urutan belajar yang dimulai dari karya kecil membuat lebih banyak peserta bertahan, meskipun karya kecil itu belum melatih peserta membaca motif yang rumit.",
        },
        {
          correct: false,
          label:
            "Karya kecil melatih peserta membaca motif yang rumit lebih cepat sehingga dua pertiga peserta angkatan kedua bertahan hingga akhir tahun.",
        },
        {
          correct: false,
          label:
            "Dua pertiga peserta angkatan kedua berhasil menyelesaikan selendang karena mereka belajar mulai dari karya kecil.",
        },
        {
          correct: false,
          label:
            "Peserta lebih menyukai karya kecil sehingga selendang tidak lagi menjadi tujuan kelas menenun di sanggar itu.",
        },
      ],
    },
  },
};

export default item;
