import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Awalnya ia mengutamakan kertas yang berkilau.",
        },
        {
          isCorrect: true,
          label: "Ia belajar memeriksa kekuatan rangka.",
        },
        {
          isCorrect: false,
          label: "Ia tetap menganggap bekas perbaikan harus disembunyikan.",
        },
        {
          isCorrect: true,
          label: "Ia akhirnya melihat bekas perbaikan sebagai bukti belajar.",
        },
      ],
    },
  },
  stimulusKey: "kite-frame",
};

export default item;
