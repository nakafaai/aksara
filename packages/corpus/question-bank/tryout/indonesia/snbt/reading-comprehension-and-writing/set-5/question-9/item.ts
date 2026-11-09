import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "goat-milk",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Susu lolos uji kebersihan.",
        },
        {
          correct: false,
          label: "Susu didinginkan sendiri oleh peternak.",
        },
        {
          correct: false,
          label: "Susu sudah diolah menjadi yoghurt.",
        },
        {
          correct: false,
          label: "Susu dijual ke pasar sebelum basi.",
        },
        {
          correct: false,
          label: "Susu berasal dari peternak muda.",
        },
      ],
    },
  },
};

export default item;
