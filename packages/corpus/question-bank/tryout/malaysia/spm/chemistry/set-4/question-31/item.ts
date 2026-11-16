import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Magnesium gives $$1.80\\text{ dm}^3$$ of hydrogen, and sodium carbonate gives $$0.72\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "Magnesium gives $$2.40\\text{ dm}^3$$ of hydrogen, and sodium carbonate gives $$1.20\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: true,
          label:
            "Magnesium gives $$1.20\\text{ dm}^3$$ of hydrogen with $$0.60\\text{ g}$$ of magnesium left, and sodium carbonate gives $$0.72\\text{ dm}^3$$ of carbon dioxide",
        },
        {
          correct: false,
          label:
            "Magnesium gives $$1.20\\text{ dm}^3$$ of hydrogen with $$0.60\\text{ g}$$ of magnesium left, and sodium carbonate gives $$1.20\\text{ dm}^3$$ of carbon dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Magnesium memberikan $$1.80\\text{ dm}^3$$ hidrogen, dan natrium karbonat memberikan $$0.72\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "Magnesium memberikan $$2.40\\text{ dm}^3$$ hidrogen, dan natrium karbonat memberikan $$1.20\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: true,
          label:
            "Magnesium memberikan $$1.20\\text{ dm}^3$$ hidrogen dengan baki $$0.60\\text{ g}$$ magnesium, dan natrium karbonat memberikan $$0.72\\text{ dm}^3$$ karbon dioksida",
        },
        {
          correct: false,
          label:
            "Magnesium memberikan $$1.20\\text{ dm}^3$$ hidrogen dengan baki $$0.60\\text{ g}$$ magnesium, dan natrium karbonat memberikan $$1.20\\text{ dm}^3$$ karbon dioksida",
        },
      ],
    },
  },
};

export default item;
