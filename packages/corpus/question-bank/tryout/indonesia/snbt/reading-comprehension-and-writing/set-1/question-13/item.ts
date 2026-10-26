import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kata _diuji_ pada kalimat (2).",
        },
        {
          correct: false,
          label: "Kata _membantu_ pada kalimat (3).",
        },
        {
          correct: false,
          label: "Kata _memungkinkan_ pada kalimat (4).",
        },
        {
          correct: true,
          label: "Kata _menghasilkan_ pada kalimat (8).",
        },
        {
          correct: false,
          label: "Kata _mengancam_ pada kalimat (9).",
        },
      ],
    },
  },
};

export default item;
