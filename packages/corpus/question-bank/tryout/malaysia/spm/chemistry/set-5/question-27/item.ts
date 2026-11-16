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
          label: "$$3$$ alcohols, $$2$$ of them oxidised to an acid",
        },
        {
          correct: false,
          label: "$$4$$ alcohols, all $$4$$ oxidised to an acid",
        },
        {
          correct: false,
          label: "$$4$$ alcohols, $$3$$ of them oxidised to an acid",
        },
        {
          correct: true,
          label: "$$4$$ alcohols, $$2$$ of them oxidised to an acid",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3$$ alkohol, $$2$$ daripadanya dioksidakan kepada asid",
        },
        {
          correct: false,
          label: "$$4$$ alkohol, kesemua $$4$$ dioksidakan kepada asid",
        },
        {
          correct: false,
          label: "$$4$$ alkohol, $$3$$ daripadanya dioksidakan kepada asid",
        },
        {
          correct: true,
          label: "$$4$$ alkohol, $$2$$ daripadanya dioksidakan kepada asid",
        },
      ],
    },
  },
};

export default item;
