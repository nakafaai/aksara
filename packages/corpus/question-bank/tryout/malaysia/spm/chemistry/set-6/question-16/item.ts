import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$3.25\\text{ g}$$ of iron(III) chloride, $$2.67\\text{ g}$$ of aluminium chloride",
        },
        {
          correct: false,
          label:
            "$$1.63\\text{ g}$$ of iron(III) chloride, $$1.34\\text{ g}$$ of aluminium chloride",
        },
        {
          correct: false,
          label:
            "$$3.25\\text{ g}$$ of iron(III) chloride, $$1.34\\text{ g}$$ of aluminium chloride",
        },
        {
          correct: false,
          label:
            "$$6.50\\text{ g}$$ of iron(III) chloride, $$5.34\\text{ g}$$ of aluminium chloride",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$3.25\\text{ g}$$ ferum(III) klorida, $$2.67\\text{ g}$$ aluminium klorida",
        },
        {
          correct: false,
          label:
            "$$1.63\\text{ g}$$ ferum(III) klorida, $$1.34\\text{ g}$$ aluminium klorida",
        },
        {
          correct: false,
          label:
            "$$3.25\\text{ g}$$ ferum(III) klorida, $$1.34\\text{ g}$$ aluminium klorida",
        },
        {
          correct: false,
          label:
            "$$6.50\\text{ g}$$ ferum(III) klorida, $$5.34\\text{ g}$$ aluminium klorida",
        },
      ],
    },
  },
};

export default item;
