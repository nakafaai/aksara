import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "plant-tissue-organisation-and-growth",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2021$$, and the tree is $$14$$ years old" },
        { correct: true, label: "$$2022$$, and the tree is $$14$$ years old" },
        { correct: false, label: "$$2022$$, and the tree is $$28$$ years old" },
        { correct: false, label: "$$2017$$, and the tree is $$14$$ years old" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2021$$, dan pokok itu berumur $$14$$ tahun",
        },
        {
          correct: true,
          label: "$$2022$$, dan pokok itu berumur $$14$$ tahun",
        },
        {
          correct: false,
          label: "$$2022$$, dan pokok itu berumur $$28$$ tahun",
        },
        {
          correct: false,
          label: "$$2017$$, dan pokok itu berumur $$14$$ tahun",
        },
      ],
    },
  },
};

export default item;
