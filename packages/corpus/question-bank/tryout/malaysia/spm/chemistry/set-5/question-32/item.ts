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
        { correct: true, label: "$$2$$ alcohols, $$4.8\\text{ g}$$ in total" },
        { correct: false, label: "$$1$$ alcohol, $$4.8\\text{ g}$$" },
        { correct: false, label: "$$2$$ alcohols, $$6.0\\text{ g}$$ in total" },
        { correct: false, label: "$$2$$ alcohols, $$3.4\\text{ g}$$ in total" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$2$$ alkohol, $$4.8\\text{ g}$$ kesemuanya" },
        { correct: false, label: "$$1$$ alkohol, $$4.8\\text{ g}$$" },
        {
          correct: false,
          label: "$$2$$ alkohol, $$6.0\\text{ g}$$ kesemuanya",
        },
        {
          correct: false,
          label: "$$2$$ alkohol, $$3.4\\text{ g}$$ kesemuanya",
        },
      ],
    },
  },
};

export default item;
