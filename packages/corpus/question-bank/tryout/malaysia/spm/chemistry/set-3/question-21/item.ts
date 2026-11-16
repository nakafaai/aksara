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
          correct: true,
          label:
            "Manganese is reduced from $$+7$$ to $$+2$$, $$5.42\\text{ g}$$ of iron(III) chloride forms, and the chloride ions reach $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Manganese is oxidised from $$+7$$ to $$+2$$, $$5.42\\text{ g}$$ of iron(III) chloride forms, and the chloride ions reach $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Manganese is reduced from $$+7$$ to $$+2$$, $$8.13\\text{ g}$$ of iron(III) chloride forms, and the chloride ions reach $$0.60\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Manganese is reduced from $$+7$$ to $$+2$$, $$5.42\\text{ g}$$ of iron(III) chloride forms, and the chloride ions reach $$0.13\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mangan diturunkan daripada $$+7$$ kepada $$+2$$, $$5.42\\text{ g}$$ ferum(III) klorida terbentuk, dan ion klorida mencapai $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Mangan dioksidakan daripada $$+7$$ kepada $$+2$$, $$5.42\\text{ g}$$ ferum(III) klorida terbentuk, dan ion klorida mencapai $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Mangan diturunkan daripada $$+7$$ kepada $$+2$$, $$8.13\\text{ g}$$ ferum(III) klorida terbentuk, dan ion klorida mencapai $$0.60\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Mangan diturunkan daripada $$+7$$ kepada $$+2$$, $$5.42\\text{ g}$$ ferum(III) klorida terbentuk, dan ion klorida mencapai $$0.13\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
