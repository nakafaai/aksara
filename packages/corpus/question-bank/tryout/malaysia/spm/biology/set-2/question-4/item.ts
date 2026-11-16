import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-composition-in-a-cell",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$86$$ released and $$2$$ used" },
        { correct: true, label: "$$85$$ released and $$2$$ used" },
        { correct: false, label: "$$49$$ released and $$2$$ used" },
        { correct: false, label: "$$85$$ released and $$35$$ used" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$86$$ dibebaskan dan $$2$$ digunakan" },
        { correct: true, label: "$$85$$ dibebaskan dan $$2$$ digunakan" },
        { correct: false, label: "$$49$$ dibebaskan dan $$2$$ digunakan" },
        { correct: false, label: "$$85$$ dibebaskan dan $$35$$ digunakan" },
      ],
    },
  },
};

export default item;
