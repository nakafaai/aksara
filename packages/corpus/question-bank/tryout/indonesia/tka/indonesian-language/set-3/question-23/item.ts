import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Lama genangan.",
        },
        {
          correct: true,
          label: "Kekuatan arus.",
        },
        {
          correct: true,
          label: "Jenis mangrove alami di sekitar.",
        },
        {
          correct: false,
          label: "Warna polibag yang paling cerah.",
        },
      ],
    },
  },
};

export default item;
