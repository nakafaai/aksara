import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "puter",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Garam membuat campuran es menjadi jauh lebih dingin daripada es batu biasa.",
        },
        {
          correct: false,
          label: "Tabung es puter terbuat dari logam.",
        },
        {
          correct: false,
          label: "Es puter tradisional dibuat dari santan.",
        },
        {
          correct: false,
          label: "Serutan es lebih disukai daripada es puter.",
        },
        {
          correct: true,
          label:
            "Pengadukan membuat adonan membeku merata dan teksturnya lembut.",
        },
      ],
    },
  },
};

export default item;
