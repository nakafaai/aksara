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
          label: "$$1.58\\text{ V}$$, increases by $$2.16\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$3.18\\text{ V}$$, increases by $$2.16\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.18\\text{ V}$$, increases by $$1.08\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.18\\text{ V}$$, decreases by $$2.16\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.58\\text{ V}$$, bertambah $$2.16\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$3.18\\text{ V}$$, bertambah $$2.16\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.18\\text{ V}$$, bertambah $$1.08\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$3.18\\text{ V}$$, berkurang $$2.16\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
