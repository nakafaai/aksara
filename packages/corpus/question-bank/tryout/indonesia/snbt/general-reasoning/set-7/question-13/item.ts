import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "quantifier-negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua peserta kemah tidak membawa senter.",
        },
        {
          correct: false,
          label: "Tidak ada peserta kemah yang membawa senter.",
        },
        {
          correct: true,
          label: "Ada peserta kemah yang tidak membawa senter.",
        },
        {
          correct: false,
          label: "Ada peserta kemah yang membawa senter.",
        },
        {
          correct: false,
          label: "Sebagian besar peserta kemah tidak membawa senter.",
        },
      ],
    },
  },
};

export default item;
