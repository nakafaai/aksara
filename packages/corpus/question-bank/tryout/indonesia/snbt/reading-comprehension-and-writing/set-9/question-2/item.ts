import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "fire-volunteers",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sejak itu, warga membentuk regu relawan pemadam yang beranggotakan sekitar 30 orang.",
        },
        {
          correct: false,
          label:
            "Sejak itu, warga membentuk regu relawan pemadam yang beranggotakan kurang lebih sekitar tiga puluhan orang.",
        },
        {
          correct: false,
          label:
            "Sejak itu, warga membentuk regu relawan pemadam yang beranggotakan kira-kira sekitar 30 orang.",
        },
        {
          correct: false,
          label:
            "Sejak itu, warga membentuk regu relawan pemadam, yang beranggotakan kurang lebih sekitar 30 orang.",
        },
        {
          correct: false,
          label:
            "Sejak itu, warga membentuk regu relawan pemadam yang beranggotakan sekitar kurang lebih 30 orang.",
        },
      ],
    },
  },
};

export default item;
