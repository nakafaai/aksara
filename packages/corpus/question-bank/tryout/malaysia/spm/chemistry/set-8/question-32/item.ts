import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ethanol $$2.13\\text{ dm}^3$$, octane $$1.49\\text{ dm}^3$$, $$3.2\\text{ kg}$$ carbon dioxide each",
        },
        {
          correct: false,
          label:
            "Ethanol $$0.53\\text{ dm}^3$$, octane $$0.37\\text{ dm}^3$$, $$0.80\\text{ kg}$$ carbon dioxide each",
        },
        {
          correct: false,
          label:
            "Ethanol $$1.33\\text{ dm}^3$$, octane $$0.73\\text{ dm}^3$$, $$3.2\\text{ kg}$$ carbon dioxide each",
        },
        {
          correct: false,
          label:
            "Ethanol $$2.13\\text{ dm}^3$$, octane $$1.49\\text{ dm}^3$$, carbon dioxide $$1.6$$ and $$3.2\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Etanol $$2.13\\text{ dm}^3$$, oktana $$1.49\\text{ dm}^3$$, $$3.2\\text{ kg}$$ karbon dioksida setiap satu",
        },
        {
          correct: false,
          label:
            "Etanol $$0.53\\text{ dm}^3$$, oktana $$0.37\\text{ dm}^3$$, $$0.80\\text{ kg}$$ karbon dioksida setiap satu",
        },
        {
          correct: false,
          label:
            "Etanol $$1.33\\text{ dm}^3$$, oktana $$0.73\\text{ dm}^3$$, $$3.2\\text{ kg}$$ karbon dioksida setiap satu",
        },
        {
          correct: false,
          label:
            "Etanol $$2.13\\text{ dm}^3$$, oktana $$1.49\\text{ dm}^3$$, karbon dioksida $$1.6$$ dan $$3.2\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
