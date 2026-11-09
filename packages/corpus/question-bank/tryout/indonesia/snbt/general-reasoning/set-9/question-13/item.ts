import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "negation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jika tidak hujan, jalan di depan sekolah tidak tergenang.",
        },
        {
          correct: false,
          label:
            "Jika jalan di depan sekolah tidak tergenang, maka tidak hujan.",
        },
        {
          correct: false,
          label: "Tidak hujan dan jalan di depan sekolah tergenang.",
        },
        {
          correct: false,
          label: "Tidak hujan atau jalan di depan sekolah tergenang.",
        },
        {
          correct: true,
          label: "Hujan dan jalan di depan sekolah tidak tergenang.",
        },
      ],
    },
  },
};

export default item;
