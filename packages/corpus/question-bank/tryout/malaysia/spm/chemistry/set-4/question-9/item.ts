import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.60\\text{ g}$$ of bromine forms, and it frees $$2.54\\text{ g}$$ of iodine, turning the organic layer purple",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ g}$$ of bromine forms, and it frees $$0.635\\text{ g}$$ of iodine, turning the organic layer purple",
        },
        {
          correct: true,
          label:
            "$$0.80\\text{ g}$$ of bromine forms, and it frees $$1.27\\text{ g}$$ of iodine, turning the organic layer purple",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ g}$$ of bromine forms, and it frees $$1.27\\text{ g}$$ of iodine, turning the organic layer colourless",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.60\\text{ g}$$ bromin terbentuk, dan ia membebaskan $$2.54\\text{ g}$$ iodin, menjadikan lapisan organik ungu",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ g}$$ bromin terbentuk, dan ia membebaskan $$0.635\\text{ g}$$ iodin, menjadikan lapisan organik ungu",
        },
        {
          correct: true,
          label:
            "$$0.80\\text{ g}$$ bromin terbentuk, dan ia membebaskan $$1.27\\text{ g}$$ iodin, menjadikan lapisan organik ungu",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ g}$$ bromin terbentuk, dan ia membebaskan $$1.27\\text{ g}$$ iodin, menjadikan lapisan organik tanpa warna",
        },
      ],
    },
  },
};

export default item;
