import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$34.5\\text{ g}$$" },
        { correct: false, label: "$$24.1\\text{ g}$$" },
        {
          correct: false,
          label:
            "$$49.2\\text{ g}$$, though the soup would cool because $$\\Delta H$$ is negative",
        },
        { correct: true, label: "$$49.2\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$34.5\\text{ g}$$" },
        { correct: false, label: "$$24.1\\text{ g}$$" },
        {
          correct: false,
          label:
            "$$49.2\\text{ g}$$, walaupun sup akan menjadi sejuk kerana $$\\Delta H$$ negatif",
        },
        { correct: true, label: "$$49.2\\text{ g}$$" },
      ],
    },
  },
};

export default item;
