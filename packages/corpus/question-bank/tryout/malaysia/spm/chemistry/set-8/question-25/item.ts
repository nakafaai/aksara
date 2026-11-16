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
          label: "Not redox, chromium stays at $$+6$$, $$0.010\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Reduction, chromium goes from $$+6$$ to $$+3$$, $$0.010\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Oxidation, chromium goes from $$+6$$ to $$+7$$, $$0.020\\text{ mol}$$",
        },
        {
          correct: false,
          label: "Not redox, chromium stays at $$+6$$, $$0.020\\text{ mol}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bukan redoks, kromium kekal pada $$+6$$, $$0.010\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Penurunan, kromium berubah daripada $$+6$$ kepada $$+3$$, $$0.010\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Pengoksidaan, kromium berubah daripada $$+6$$ kepada $$+7$$, $$0.020\\text{ mol}$$",
        },
        {
          correct: false,
          label:
            "Bukan redoks, kromium kekal pada $$+6$$, $$0.020\\text{ mol}$$",
        },
      ],
    },
  },
};

export default item;
