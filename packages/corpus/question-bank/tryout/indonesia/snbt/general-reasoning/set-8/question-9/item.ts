import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "generalization",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Varietas itu pasti tumbuh dengan baik di semua jenis lahan di Indonesia.",
        },
        {
          correct: false,
          label:
            "Dari setiap $$50$$ biji jagung varietas apa pun, sekitar $$46$$ biji akan tumbuh di lahan kering mana saja.",
        },
        {
          correct: false,
          label:
            "Varietas itu tidak akan tumbuh di lahan yang basah atau sering tergenang air.",
        },
        {
          correct: true,
          label:
            "Varietas itu kemungkinan besar dapat tumbuh baik di lahan kering yang mirip dengan lahan percobaan.",
        },
        {
          correct: false,
          label:
            "Empat biji yang tidak tumbuh pasti berasal dari karung benih yang berbeda.",
        },
      ],
    },
  },
};

export default item;
