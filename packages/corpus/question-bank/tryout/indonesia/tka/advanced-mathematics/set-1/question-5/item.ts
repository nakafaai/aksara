import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "hydroponic-farm",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$40$$ rak selada dan $$0$$ rak pakcoy",
        },
        {
          correct: false,
          label: "$$20$$ rak selada dan $$30$$ rak pakcoy",
        },
        {
          correct: false,
          label: "$$0$$ rak selada dan $$40$$ rak pakcoy",
        },
        {
          correct: false,
          label: "$$30$$ rak selada dan $$20$$ rak pakcoy",
        },
        {
          correct: false,
          label: "$$80$$ rak selada dan $$0$$ rak pakcoy",
        },
      ],
    },
  },
};

export default item;
