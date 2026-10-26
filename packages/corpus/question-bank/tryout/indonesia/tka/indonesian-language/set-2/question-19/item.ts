import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Awalnya ia mengutamakan kertas yang berkilau.",
        },
        {
          correct: true,
          label: "Ia belajar memeriksa kekuatan rangka.",
        },
        {
          correct: false,
          label: "Ia tetap menganggap bekas perbaikan harus disembunyikan.",
        },
        {
          correct: true,
          label: "Ia akhirnya melihat bekas perbaikan sebagai bukti belajar.",
        },
      ],
    },
  },
  stimulus: "kite-frame",
};

export default item;
