import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "ia membawa rangka kepada Kakek",
        },
        {
          isCorrect: false,
          label: "ia menutup mata saat diminta",
        },
        {
          isCorrect: false,
          label: "layangannya tidak menang hiasan terindah",
        },
        {
          isCorrect: true,
          label: "ia menjelaskan arti garis perbaikan kepada juri",
        },
        {
          isCorrect: false,
          label: "angin sore mulai tetap",
        },
      ],
    },
  },
  stimulusKey: "kite-frame",
};

export default item;
