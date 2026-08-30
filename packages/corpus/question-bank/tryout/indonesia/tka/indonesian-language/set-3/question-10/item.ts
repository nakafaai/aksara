import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "menunjukkan Laras tidak peduli pada keselamatan",
        },
        {
          isCorrect: true,
          label:
            "menjadi pengingat bahwa peta diperbaiki melalui pemeriksaan nyata",
        },
        {
          isCorrect: false,
          label: "membuktikan tinta merah tidak dapat kering",
        },
        {
          isCorrect: false,
          label: "menandai lokasi tempat berkumpul yang baru",
        },
        {
          isCorrect: false,
          label: "membuat peta sengaja sulit dibaca",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
