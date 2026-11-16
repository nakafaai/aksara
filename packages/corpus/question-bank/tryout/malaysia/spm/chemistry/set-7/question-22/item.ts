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
            "an increase of $$12.0\\text{ g}$$, with magnesium as the negative terminal",
        },
        {
          correct: false,
          label:
            "an increase of $$9.60\\text{ g}$$, with silver as the negative terminal",
        },
        {
          correct: false,
          label:
            "an increase of $$4.20\\text{ g}$$, with magnesium as the negative terminal",
        },
        {
          correct: true,
          label:
            "an increase of $$9.60\\text{ g}$$, with magnesium as the negative terminal",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "bertambah $$12.0\\text{ g}$$, dengan magnesium sebagai terminal negatif",
        },
        {
          correct: false,
          label:
            "bertambah $$9.60\\text{ g}$$, dengan argentum sebagai terminal negatif",
        },
        {
          correct: false,
          label:
            "bertambah $$4.20\\text{ g}$$, dengan magnesium sebagai terminal negatif",
        },
        {
          correct: true,
          label:
            "bertambah $$9.60\\text{ g}$$, dengan magnesium sebagai terminal negatif",
        },
      ],
    },
  },
};

export default item;
