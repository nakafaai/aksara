import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "explicit-information",
  },
  stimulus: "indigo-dye",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$ hours $$40$$ minutes, with $$200$$ grams of paste",
        },
        {
          correct: false,
          label: "$$5$$ hours $$40$$ minutes, with $$225$$ grams of paste",
        },
        {
          correct: false,
          label: "$$6$$ hours $$40$$ minutes, with $$250$$ grams of paste",
        },
        {
          correct: true,
          label: "$$6$$ hours $$40$$ minutes, with $$225$$ grams of paste",
        },
        {
          correct: false,
          label: "$$1$$ hour $$40$$ minutes, with $$225$$ grams of paste",
        },
      ],
    },
  },
};

export default item;
