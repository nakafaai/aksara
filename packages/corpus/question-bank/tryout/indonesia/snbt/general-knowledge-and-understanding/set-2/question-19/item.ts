import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "idiom",
  },
  stimulus: "gerhana",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tanpa pakaian yang menutupi tubuh",
        },
        {
          correct: false,
          label: "Dengan mata yang terbuka lebar",
        },
        {
          correct: true,
          label: "Tanpa bantuan alat seperti teropong atau kacamata khusus",
        },
        {
          correct: false,
          label: "Tanpa berkedip selama gerhana",
        },
        {
          correct: false,
          label: "Dalam keadaan mata lelah",
        },
      ],
    },
  },
};

export default item;
