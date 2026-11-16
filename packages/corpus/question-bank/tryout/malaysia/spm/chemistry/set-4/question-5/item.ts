import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10.6\\text{ g}$$ of sodium carbonate only",
        },
        {
          correct: false,
          label: "$$7.95\\text{ g}$$ of sodium carbonate only",
        },
        {
          correct: false,
          label: "$$8.40\\text{ g}$$ of sodium hydrogen carbonate only",
        },
        {
          correct: true,
          label:
            "$$5.30\\text{ g}$$ of sodium carbonate and $$4.20\\text{ g}$$ of sodium hydrogen carbonate",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10.6\\text{ g}$$ natrium karbonat sahaja" },
        { correct: false, label: "$$7.95\\text{ g}$$ natrium karbonat sahaja" },
        {
          correct: false,
          label: "$$8.40\\text{ g}$$ natrium hidrogen karbonat sahaja",
        },
        {
          correct: true,
          label:
            "$$5.30\\text{ g}$$ natrium karbonat dan $$4.20\\text{ g}$$ natrium hidrogen karbonat",
        },
      ],
    },
  },
};

export default item;
