import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "inference",
  },
  stimulus: "litium",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penulis mengakui keuntungan pengisian cepat sebelum menjelaskan risiko yang dapat menyertainya.",
        },
        {
          correct: true,
          label:
            "Endapan litium terbentuk ketika grafit menampung ion lebih cepat daripada laju ion didorong masuk.",
        },
        {
          correct: false,
          label:
            "Pengisian cepat pada udara dingin lebih mungkin menimbulkan endapan litium daripada pengisian cepat pada suhu biasa.",
        },
        {
          correct: false,
          label:
            "Endapan litium dapat berujung pada hubungan pendek jika endapan itu tumbuh sampai menembus selaput pemisah.",
        },
        {
          correct: false,
          label:
            "Penurunan arus ketika baterai hampir penuh berkaitan dengan risiko endapan litium yang diuraikan sebelumnya.",
        },
      ],
    },
  },
};

export default item;
