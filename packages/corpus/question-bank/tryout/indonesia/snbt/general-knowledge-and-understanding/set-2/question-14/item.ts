import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "perubahan cepat.",
        },
        {
          correct: true,
          label: "kicauan burung.",
        },
        {
          correct: false,
          label: "perawatan cermat.",
        },
        {
          correct: false,
          label: "bernyanyi nyaring.",
        },
        {
          correct: false,
          label: "pencucian lembut.",
        },
      ],
    },
  },
};

export default item;
