import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.762\\text{ g}$$, $$+5$$ to $$0$$" },
        { correct: false, label: "$$0.254\\text{ g}$$, $$+5$$ to $$0$$" },
        { correct: false, label: "$$0.762\\text{ g}$$, $$+7$$ to $$0$$" },
        { correct: false, label: "$$0.381\\text{ g}$$, $$+5$$ to $$0$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.762\\text{ g}$$, $$+5$$ kepada $$0$$" },
        { correct: false, label: "$$0.254\\text{ g}$$, $$+5$$ kepada $$0$$" },
        { correct: false, label: "$$0.762\\text{ g}$$, $$+7$$ kepada $$0$$" },
        { correct: false, label: "$$0.381\\text{ g}$$, $$+5$$ kepada $$0$$" },
      ],
    },
  },
};

export default item;
