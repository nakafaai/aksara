import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "subak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Subak adalah organisasi pemerintah yang membagi air secara merata kepada semua petani di Bali.",
        },
        {
          correct: false,
          label:
            "Penetapan oleh UNESCO telah menghentikan alih fungsi sawah subak menjadi bangunan.",
        },
        {
          correct: false,
          label:
            "Sawah di bagian hulu selalu menghasilkan padi lebih banyak daripada sawah di bagian hilir.",
        },
        {
          correct: false,
          label:
            "Hama padi di Bali hanya dapat dikendalikan dengan membiarkan sawah kering setelah setiap panen selesai.",
        },
        {
          correct: true,
          label:
            "Keberhasilan setiap petak sawah subak bergantung pada pengaturan bersama atas air dan waktu tanam.",
        },
      ],
    },
  },
};

export default item;
