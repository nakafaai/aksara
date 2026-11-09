import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "flaw",
  },
  stimulus: "kamera",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menganggap data dua tahun terlalu sedikit untuk dibandingkan satu sama lain",
        },
        {
          correct: false,
          label:
            "tidak menyebutkan harga kamera CCTV yang dipasang di jalan-jalan utama",
        },
        {
          correct: false,
          label:
            "membandingkan jumlah kasus dari dua periode yang panjangnya berbeda",
        },
        {
          correct: true,
          label:
            "mengabaikan ronda malam yang dimulai hampir bersamaan sebagai penyebab lain",
        },
        {
          correct: false,
          label:
            "menganggap semua warga desa setuju dengan rencana penambahan kamera",
        },
      ],
    },
  },
};

export default item;
