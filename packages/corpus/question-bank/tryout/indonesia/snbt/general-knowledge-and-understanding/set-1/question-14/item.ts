import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "polysemy",
  },
  stimulus: "bahasa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Jenis kayu yang keras dan awet.",
        },
        {
          correct: true,
          label: "Asli atau sejati.",
        },
        {
          correct: false,
          label: "Berusia lanjut dan berpengalaman.",
        },
        {
          correct: false,
          label: "Terlatih mengajar di kelas.",
        },
        {
          correct: false,
          label: "Terkenal di kalangan masyarakatnya.",
        },
      ],
    },
  },
};

export default item;
