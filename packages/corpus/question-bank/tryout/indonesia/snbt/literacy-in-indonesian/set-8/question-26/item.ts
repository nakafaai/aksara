import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "framing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Keempat program memberi hasil rata-rata yang sama, $$200$$ orang selamat, tetapi kebanyakan peserta beralih pilihan saat bingkainya berubah.",
        },
        {
          correct: false,
          label:
            "Program B dan D lebih berisiko daripada program A dan C, sehingga peserta yang rasional seharusnya selalu memilih program yang pasti.",
        },
        {
          correct: false,
          label:
            "Peserta di kedua kelompok membaca program yang sama sekali berbeda, sehingga pilihan mereka tidak dapat dibandingkan.",
        },
        {
          correct: false,
          label:
            "Program A menyelamatkan lebih banyak orang daripada program C, tetapi peserta tidak menyadarinya.",
        },
        {
          correct: false,
          label:
            "Peserta di kelompok kedua lebih pandai berhitung peluang, sehingga mereka memilih program yang menyelamatkan lebih banyak orang.",
        },
      ],
    },
  },
};

export default item;
