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
        { correct: false, label: "$$2$$ esters, none share a formula" },
        { correct: false, label: "$$4$$ esters, none share a formula" },
        { correct: true, label: "$$4$$ esters, $$2$$ share a formula" },
        { correct: false, label: "$$6$$ esters, $$2$$ share a formula" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2$$ ester, tiada yang berkongsi formula" },
        { correct: false, label: "$$4$$ ester, tiada yang berkongsi formula" },
        { correct: true, label: "$$4$$ ester, $$2$$ berkongsi formula" },
        { correct: false, label: "$$6$$ ester, $$2$$ berkongsi formula" },
      ],
    },
  },
};

export default item;
