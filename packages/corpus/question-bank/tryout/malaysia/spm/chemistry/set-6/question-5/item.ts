import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$27.2\\text{ g}$$ of aluminium iodide, $$0.90\\text{ g}$$ of aluminium left",
        },
        {
          correct: false,
          label: "$$40.8\\text{ g}$$ of aluminium iodide, no aluminium left",
        },
        {
          correct: false,
          label:
            "$$24.5\\text{ g}$$ of aluminium iodide, $$0.27\\text{ g}$$ of aluminium left",
        },
        {
          correct: true,
          label:
            "$$24.5\\text{ g}$$ of aluminium iodide, $$1.08\\text{ g}$$ of aluminium left",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$27.2\\text{ g}$$ aluminium iodida, $$0.90\\text{ g}$$ aluminium berbaki",
        },
        {
          correct: false,
          label: "$$40.8\\text{ g}$$ aluminium iodida, tiada aluminium berbaki",
        },
        {
          correct: false,
          label:
            "$$24.5\\text{ g}$$ aluminium iodida, $$0.27\\text{ g}$$ aluminium berbaki",
        },
        {
          correct: true,
          label:
            "$$24.5\\text{ g}$$ aluminium iodida, $$1.08\\text{ g}$$ aluminium berbaki",
        },
      ],
    },
  },
};

export default item;
