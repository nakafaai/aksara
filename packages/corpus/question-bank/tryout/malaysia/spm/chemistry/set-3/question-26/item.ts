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
            "$$25.0\\text{ cm}^3$$, bromide ions at $$0.10\\text{ mol dm}^{-3}$$, and $$0.450\\text{ g}$$ of green iron(II) hydroxide",
        },
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$, bromide ions at $$0.080\\text{ mol dm}^{-3}$$, and $$0.535\\text{ g}$$ of brown iron(III) hydroxide",
        },
        {
          correct: false,
          label:
            "$$50.0\\text{ cm}^3$$, bromide ions at $$0.033\\text{ mol dm}^{-3}$$, and $$0.535\\text{ g}$$ of brown iron(III) hydroxide",
        },
        {
          correct: true,
          label:
            "$$50.0\\text{ cm}^3$$, bromide ions at $$0.067\\text{ mol dm}^{-3}$$, and $$0.535\\text{ g}$$ of brown iron(III) hydroxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$25.0\\text{ cm}^3$$, ion bromida pada $$0.10\\text{ mol dm}^{-3}$$, dan $$0.450\\text{ g}$$ ferum(II) hidroksida hijau",
        },
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$, ion bromida pada $$0.080\\text{ mol dm}^{-3}$$, dan $$0.535\\text{ g}$$ ferum(III) hidroksida perang",
        },
        {
          correct: false,
          label:
            "$$50.0\\text{ cm}^3$$, ion bromida pada $$0.033\\text{ mol dm}^{-3}$$, dan $$0.535\\text{ g}$$ ferum(III) hidroksida perang",
        },
        {
          correct: true,
          label:
            "$$50.0\\text{ cm}^3$$, ion bromida pada $$0.067\\text{ mol dm}^{-3}$$, dan $$0.535\\text{ g}$$ ferum(III) hidroksida perang",
        },
      ],
    },
  },
};

export default item;
