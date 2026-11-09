import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "video-call",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ponsel Nenek Sumi adalah pemberian anaknya.",
        },
        {
          correct: false,
          label: "Arif sering datang membeli kerupuk di warung.",
        },
        {
          correct: false,
          label:
            "Nenek Sumi hanya bisa menekan tombol hijau untuk menerima telepon.",
        },
        {
          correct: false,
          label: "Ponsel berdering dengan suara yang berbeda.",
        },
        {
          correct: true,
          label: "Nenek Sumi menyisir ubannya dan memakai kebaya terbaiknya.",
        },
      ],
    },
  },
};

export default item;
