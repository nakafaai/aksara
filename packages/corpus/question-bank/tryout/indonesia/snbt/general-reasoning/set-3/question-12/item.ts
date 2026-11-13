import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "conditional-chain",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Tandon air sudah penuh, dan petak timur diairi.",
        },
        {
          correct: false,
          label:
            "Tandon air sudah penuh, tetapi belum dapat dipastikan petak mana yang diairi.",
        },
        {
          correct: false,
          label: "Tandon air sudah penuh, dan petak barat diairi.",
        },
        {
          correct: false,
          label: "Tandon air belum penuh, dan tidak ada petak yang diairi.",
        },
        {
          correct: false,
          label: "Tandon air sudah penuh, dan kedua petak diairi.",
        },
      ],
    },
  },
};

export default item;
