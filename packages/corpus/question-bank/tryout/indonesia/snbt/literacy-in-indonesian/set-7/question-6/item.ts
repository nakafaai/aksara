import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kota tempat aku tinggal sebenarnya punya laut, tetapi aku tidak pernah memperhatikan naik turunnya air di sana.",
        },
        {
          correct: false,
          label:
            "Ayah mulai pikun, sehingga ia mengira semua tempat mengalami pasang seperti kampungnya.",
        },
        {
          correct: true,
          label:
            "Setiap kehidupan punya irama naik dan turun yang perlu dikenali, dan aku belum mengenali irama hidupku di kota.",
        },
        {
          correct: false,
          label:
            "Ayah ingin aku pulang ke kampung, karena hanya di sana aku dapat belajar membaca pasang seperti dirinya dulu.",
        },
        {
          correct: false,
          label:
            "Ayah menyesal tidak mengajarkan cara membaca pasang kepadaku ketika aku masih kecil.",
        },
      ],
    },
  },
};

export default item;
