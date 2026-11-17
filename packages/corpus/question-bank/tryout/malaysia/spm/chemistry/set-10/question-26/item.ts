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
        {
          correct: false,
          label:
            "$$9.65\\times10^6\\text{ C}$$, $$300\\text{ g}$$, $$965\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$2.90\\times10^7\\text{ C}$$, $$900\\text{ g}$$, $$2.90\\times10^3\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$2.90\\times10^7\\text{ C}$$, $$1800\\text{ g}$$, $$2.90\\times10^3\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$1.93\\times10^7\\text{ C}$$, $$600\\text{ g}$$, $$1.93\\times10^3\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$9.65\\times10^6\\text{ C}$$, $$300\\text{ g}$$, $$965\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$2.90\\times10^7\\text{ C}$$, $$900\\text{ g}$$, $$2.90\\times10^3\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$2.90\\times10^7\\text{ C}$$, $$1800\\text{ g}$$, $$2.90\\times10^3\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$1.93\\times10^7\\text{ C}$$, $$600\\text{ g}$$, $$1.93\\times10^3\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
