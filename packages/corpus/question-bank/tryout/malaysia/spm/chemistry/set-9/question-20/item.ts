import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "manufactured-substances-in-industry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.06$$ tonnes, $$3.13$$ tonnes" },
        { correct: false, label: "$$2.94$$ tonnes, $$2.88$$ tonnes" },
        { correct: true, label: "$$2.94$$ tonnes, $$3.00$$ tonnes" },
        { correct: false, label: "$$1.47$$ tonnes, $$1.50$$ tonnes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$3.06$$ tan, $$3.13$$ tan" },
        { correct: false, label: "$$2.94$$ tan, $$2.88$$ tan" },
        { correct: true, label: "$$2.94$$ tan, $$3.00$$ tan" },
        { correct: false, label: "$$1.47$$ tan, $$1.50$$ tan" },
      ],
    },
  },
};

export default item;
