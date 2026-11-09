import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "seed-soak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Biji kacang hijau tidak dapat berkecambah tanpa direndam.",
        },
        {
          correct: false,
          label:
            "Makin lama biji kacang hijau direndam, makin baik perkecambahannya.",
        },
        {
          correct: false,
          label:
            "Perendaman selama 24 jam memberi hasil perkecambahan terbaik.",
        },
        {
          correct: false,
          label:
            "Lama perendaman tidak berpengaruh pada perkecambahan biji kacang hijau.",
        },
        {
          correct: true,
          label:
            "Perendaman membantu perkecambahan biji kacang hijau, tetapi perendaman yang terlalu lama justru mengurangi biji yang berkecambah.",
        },
      ],
    },
  },
};

export default item;
