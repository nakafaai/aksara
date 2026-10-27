import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "kite-frame",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "ia membawa rangka kepada Kakek",
        },
        {
          correct: false,
          label: "ia menutup mata saat diminta",
        },
        {
          correct: false,
          label: "layangannya tidak menang hiasan terindah",
        },
        {
          correct: true,
          label: "ia menjelaskan arti garis perbaikan kepada juri",
        },
        {
          correct: false,
          label: "angin sore mulai tetap",
        },
      ],
    },
  },
};

export default item;
