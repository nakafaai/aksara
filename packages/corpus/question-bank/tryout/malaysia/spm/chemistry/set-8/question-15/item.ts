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
        { correct: false, label: "$$50$$ tonnes" },
        { correct: false, label: "$$12.5$$ tonnes" },
        { correct: false, label: "$$250$$ tonnes" },
        { correct: true, label: "$$25$$ tonnes" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50$$ tan" },
        { correct: false, label: "$$12.5$$ tan" },
        { correct: false, label: "$$250$$ tan" },
        { correct: true, label: "$$25$$ tan" },
      ],
    },
  },
};

export default item;
