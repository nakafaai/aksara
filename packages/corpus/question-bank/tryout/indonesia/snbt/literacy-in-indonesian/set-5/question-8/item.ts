import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "social-media-age",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Aplikasi pesan berkelompok makin populer di kalangan pengguna dewasa dalam beberapa tahun terakhir.",
        },
        {
          correct: false,
          label:
            "Situs kecil tanpa tim moderasi memuat lebih banyak konten berbahaya daripada platform besar.",
        },
        {
          correct: false,
          label:
            "Banyak remaja yang kehilangan akun beralih ke aplikasi pesan yang tidak dimoderasi.",
        },
        {
          correct: false,
          label:
            "Sebagian orang tua mungkin merasa lebih tenang setelah larangan media sosial berlaku.",
        },
        {
          correct: true,
          label:
            "Di negara yang melarang, kebanyakan remaja yang kehilangan akun tidak pindah ke aplikasi lain.",
        },
      ],
    },
  },
};

export default item;
