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
          label: "P and S, $$2.24\\text{ V}$$, with P as the negative terminal",
        },
        {
          correct: true,
          label: "P and S, $$3.16\\text{ V}$$, with P as the negative terminal",
        },
        {
          correct: false,
          label: "P and S, $$3.16\\text{ V}$$, with S as the negative terminal",
        },
        {
          correct: false,
          label: "P and Q, $$2.30\\text{ V}$$, with P as the negative terminal",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "P dan S, $$2.24\\text{ V}$$, dengan P sebagai terminal negatif",
        },
        {
          correct: true,
          label:
            "P dan S, $$3.16\\text{ V}$$, dengan P sebagai terminal negatif",
        },
        {
          correct: false,
          label:
            "P dan S, $$3.16\\text{ V}$$, dengan S sebagai terminal negatif",
        },
        {
          correct: false,
          label:
            "P dan Q, $$2.30\\text{ V}$$, dengan P sebagai terminal negatif",
        },
      ],
    },
  },
};

export default item;
