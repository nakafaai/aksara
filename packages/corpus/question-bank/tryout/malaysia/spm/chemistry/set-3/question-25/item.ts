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
            "$$0.96\\text{ dm}^3$$ of gas left, $$56\\%$$ of the iron rusted, and a gain in mass of $$0.32\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.96\\text{ dm}^3$$ of gas left, about $$37\\%$$ of the iron rusted, and a gain in mass of $$0.32\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.24\\text{ dm}^3$$ of gas left, about $$37\\%$$ of the iron rusted, and a gain in mass of $$0.32\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.96\\text{ dm}^3$$ of gas left, about $$37\\%$$ of the iron rusted, and a gain in mass of $$1.07\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.96\\text{ dm}^3$$ gas tinggal, $$56\\%$$ ferum berkarat, dan pertambahan jisim $$0.32\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.96\\text{ dm}^3$$ gas tinggal, kira-kira $$37\\%$$ ferum berkarat, dan pertambahan jisim $$0.32\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.24\\text{ dm}^3$$ gas tinggal, kira-kira $$37\\%$$ ferum berkarat, dan pertambahan jisim $$0.32\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.96\\text{ dm}^3$$ gas tinggal, kira-kira $$37\\%$$ ferum berkarat, dan pertambahan jisim $$1.07\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
