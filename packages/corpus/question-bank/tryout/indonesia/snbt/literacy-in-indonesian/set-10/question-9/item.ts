import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "crossing-guard",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ayah Rani kemungkinan besar adalah penjaga yang membantu mengangkat korban dari rel.",
        },
        {
          correct: true,
          label:
            "Cara palang pintu di pos itu dioperasikan sudah berubah sejak Rani kecil.",
        },
        {
          correct: false,
          label: "Penjaga muda di pos itu mengenal ayah Rani.",
        },
        {
          correct: false,
          label: "Ayah Rani lupa bahwa hari itu adalah hari ulang tahun Rani.",
        },
        {
          correct: true,
          label:
            "Rani membawa kue kecil yang sama untuk mengenang sore ketika ia dulu menunggu ayahnya.",
        },
      ],
    },
  },
};

export default item;
