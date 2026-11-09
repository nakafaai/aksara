import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "application",
  },
  stimulus: "hoaks",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mencari apakah media lain yang tepercaya juga memuat klaim yang sama.",
        },
        {
          correct: false,
          label: "Langsung membagikannya agar teman-teman segera waspada.",
        },
        {
          correct: false,
          label:
            "Memeriksa apakah tata letak dan logo situs itu benar-benar mirip dengan media terkenal.",
        },
        {
          correct: false,
          label: "Membaca judulnya sekali lagi dengan lebih teliti.",
        },
        {
          correct: false,
          label: "Mempercayainya karena situs itu tampak profesional.",
        },
      ],
    },
  },
};

export default item;
