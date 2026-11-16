import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.00$$ tonnes" },
        { correct: false, label: "$$1.60$$ tonnes" },
        { correct: false, label: "$$5.00$$ tonnes" },
        { correct: true, label: "$$2.50$$ tonnes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.00$$ tan" },
        { correct: false, label: "$$1.60$$ tan" },
        { correct: false, label: "$$5.00$$ tan" },
        { correct: true, label: "$$2.50$$ tan" },
      ],
    },
  },
};

export default item;
