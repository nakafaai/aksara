import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "serapan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "lembut dan enak didengar bunyinya",
        },
        {
          correct: false,
          label:
            "dipakai untuk memperhalus pokok pembicaraan yang kasar atau tabu",
        },
        {
          correct: false,
          label: "tinggi mutunya sehingga lazim dipakai dalam karya sastra",
        },
        {
          correct: false,
          label: "baku dan sesuai dengan kaidah tata bahasa",
        },
        {
          correct: true,
          label:
            "sopan dan dipakai untuk menunjukkan hormat kepada lawan bicara",
        },
      ],
    },
  },
};

export default item;
