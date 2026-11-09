import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "statistical-syllogism",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pohon X pasti berbuah lebat.",
        },
        {
          correct: false,
          label: "Pohon X tidak mungkin berbuah lebat.",
        },
        {
          correct: false,
          label: "Pohon X hanya akan berbuah lebat jika dipupuk dua kali.",
        },
        {
          correct: true,
          label: "Pohon X kemungkinan besar berbuah lebat.",
        },
        {
          correct: false,
          label: "Buah pohon X sama sekali tidak dapat diperkirakan.",
        },
      ],
    },
  },
};

export default item;
