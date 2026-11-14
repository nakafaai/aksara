import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "oil-soap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "alat pelindung dipakai agar sabun yang dihasilkan lebih wangi",
        },
        {
          correct: true,
          label:
            "alat pelindung dipakai karena larutan soda api panas dan dapat melukai kulit",
        },
        {
          correct: false,
          label: "larutan soda api dibuat dari sarung tangan bekas",
        },
        {
          correct: false,
          label: "alat pelindung dipakai karena jelantah berbau tidak sedap",
        },
        {
          correct: false,
          label: "alat pelindung tidak berhubungan dengan larutan soda api",
        },
      ],
    },
  },
};

export default item;
