import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "novel-review",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pembaca yang hanya menyukai cerita dengan akhir yang dibangun perlahan dan rapi.",
        },
        {
          correct: false,
          label:
            "Pembaca yang mencari buku panduan teknis tentang pengelolaan mata air.",
        },
        {
          correct: false,
          label:
            "Pembaca yang menginginkan kisah petualangan dengan banyak adegan laga.",
        },
        {
          correct: false,
          label:
            "Pembaca yang lebih menyukai tokoh pendukung daripada tokoh utama.",
        },
        {
          correct: true,
          label:
            "Pembaca yang menyukai kisah manusia dan alam tanpa menuntut jawaban mudah.",
        },
      ],
    },
  },
};

export default item;
