import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "cassava-flour",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dikupas, lalu diiris tipis",
        },
        {
          correct: false,
          label: "diberi bakteri baik",
        },
        {
          correct: true,
          label: "dikeringkan, digiling, lalu diayak",
        },
        {
          correct: false,
          label: "dicampur dengan sedikit terigu",
        },
        {
          correct: false,
          label: "dijemur sampai berbau singkong",
        },
      ],
    },
  },
};

export default item;
