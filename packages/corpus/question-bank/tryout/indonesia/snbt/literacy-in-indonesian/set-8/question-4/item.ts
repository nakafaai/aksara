import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "tempe-mold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tempe jadi lebih cepat karena kapang tumbuh jauh lebih subur tanpa udara.",
        },
        {
          correct: false,
          label:
            "Tempe mengandung lebih banyak vitamin B12 karena kapangnya murni.",
        },
        {
          correct: false,
          label:
            "Butir kedelai merekat lebih kuat karena airnya membantu miselium.",
        },
        {
          correct: true,
          label:
            "Bakteri lain tumbuh lebih cepat daripada kapang sehingga tempe busuk.",
        },
        {
          correct: false,
          label:
            "Tempe mungkin lebih mudah dicerna karena kedelainya masih basah.",
        },
      ],
    },
  },
};

export default item;
