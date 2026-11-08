import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "gamelan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Saron itu akan menyesuaikan nadanya sendiri dengan perangkat B.",
        },
        {
          correct: false,
          label:
            "Perangkat B akan berubah dari laras slendro menjadi laras pelog.",
        },
        {
          correct: false,
          label: "Gending sama sekali tidak dapat dimainkan oleh perangkat B.",
        },
        {
          correct: false,
          label:
            "Saron itu akan rusak karena dimainkan bersama perangkat lain.",
        },
        {
          correct: true,
          label:
            "Nada saron itu kemungkinan terdengar kurang selaras dengan instrumen lain dalam perangkat B.",
        },
      ],
    },
  },
};

export default item;
