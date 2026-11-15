import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "testing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Keunggulan latihan mengingat baru tampak pada tes yang tertunda, sedangkan tes lima menit masih diuntungkan oleh bacaan yang baru saja dibaca.",
        },
        {
          correct: false,
          label:
            "Hasil tes lima menit tidak dapat dipercaya, karena mahasiswa belum sempat beristirahat dan masih lelah sesudah sesi terakhir.",
        },
        {
          correct: false,
          label:
            "Pada tes lima menit, kelompok yang mengingat tiga kali sebenarnya juga mengingat paling banyak jika angkanya tidak dibulatkan.",
        },
        {
          correct: false,
          label:
            "Tes lima menit memakai teks yang berbeda dari tes satu minggu, sehingga keduanya tidak dapat dibandingkan.",
        },
        {
          correct: false,
          label:
            "Kelompok yang membaca empat kali menghabiskan waktu belajar lebih lama daripada kelompok lain, sehingga hasil tes lima menitnya tidak adil.",
        },
      ],
    },
  },
};

export default item;
