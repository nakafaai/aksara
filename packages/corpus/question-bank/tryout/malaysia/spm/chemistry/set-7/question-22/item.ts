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
            "an increase of $$12.0\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$ of silver ions, with magnesium as the negative terminal",
        },
        {
          correct: false,
          label:
            "an increase of $$9.60\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$ of silver ions, with silver as the negative terminal",
        },
        {
          correct: false,
          label:
            "an increase of $$4.20\\text{ g}$$, $$0.750\\text{ mol dm}^{-3}$$ of silver ions, with magnesium as the negative terminal",
        },
        {
          correct: true,
          label:
            "an increase of $$9.60\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$ of silver ions, with magnesium as the negative terminal",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pertambahan $$12.0\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$ ion argentum, dengan magnesium sebagai terminal negatif",
        },
        {
          correct: false,
          label:
            "pertambahan $$9.60\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$ ion argentum, dengan perak sebagai terminal negatif",
        },
        {
          correct: false,
          label:
            "pertambahan $$4.20\\text{ g}$$, $$0.750\\text{ mol dm}^{-3}$$ ion argentum, dengan magnesium sebagai terminal negatif",
        },
        {
          correct: true,
          label:
            "pertambahan $$9.60\\text{ g}$$, $$0.500\\text{ mol dm}^{-3}$$ ion argentum, dengan magnesium sebagai terminal negatif",
        },
      ],
    },
  },
};

export default item;
