import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "In X, oxygen forms at the anode and the solution becomes acidic; in Y, the silver anode dissolves and the solution concentration stays the same",
        },
        {
          correct: false,
          label:
            "In X, silver forms at the anode; in Y, oxygen forms at the anode",
        },
        {
          correct: false,
          label:
            "In X, silver forms at the cathode and the solution becomes alkaline; in Y, the silver cathode dissolves",
        },
        {
          correct: false,
          label:
            "In X, nitrogen dioxide forms at the anode; in Y, the silver anode grows thicker",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam X, oksigen terbentuk di anod dan larutan menjadi berasid; dalam Y, anod argentum melarut dan kepekatan larutan tidak berubah",
        },
        {
          correct: false,
          label:
            "Dalam X, argentum terbentuk di anod; dalam Y, oksigen terbentuk di anod",
        },
        {
          correct: false,
          label:
            "Dalam X, argentum terbentuk di katod dan larutan menjadi beralkali; dalam Y, katod argentum melarut",
        },
        {
          correct: false,
          label:
            "Dalam X, nitrogen dioksida terbentuk di anod; dalam Y, anod argentum menjadi lebih tebal",
        },
      ],
    },
  },
};

export default item;
