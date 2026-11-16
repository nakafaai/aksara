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
        { correct: false, label: "Elongation: $$0$$ to $$1\\text{ mm}$$. Differentiation: $$2$$ to $$4\\text{ mm}$$." },
        { correct: false, label: "Elongation: $$1$$ to $$2\\text{ mm}$$. Differentiation: $$3$$ to $$4\\text{ mm}$$." },
        { correct: false, label: "Elongation: $$5$$ to $$7\\text{ mm}$$. Differentiation: $$2$$ to $$4\\text{ mm}$$." },
        { correct: true, label: "Elongation: $$2$$ to $$4\\text{ mm}$$. Differentiation: $$5$$ to $$7\\text{ mm}$$." },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Pemanjangan: $$0$$ hingga $$1\\text{ mm}$$. Pembezaan: $$2$$ hingga $$4\\text{ mm}$$." },
        { correct: false, label: "Pemanjangan: $$1$$ hingga $$2\\text{ mm}$$. Pembezaan: $$3$$ hingga $$4\\text{ mm}$$." },
        { correct: false, label: "Pemanjangan: $$5$$ hingga $$7\\text{ mm}$$. Pembezaan: $$2$$ hingga $$4\\text{ mm}$$." },
        { correct: true, label: "Pemanjangan: $$2$$ hingga $$4\\text{ mm}$$. Pembezaan: $$5$$ hingga $$7\\text{ mm}$$." },
      ],
    },
  },
};

export default item;
