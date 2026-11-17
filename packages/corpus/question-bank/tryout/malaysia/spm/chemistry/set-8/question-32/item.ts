import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
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
            "Ethanol $$1.68\\text{ kg}$$, octane $$1.04\\text{ kg}$$, $$3.2\\text{ kg}$$ carbon dioxide each",
        },
        {
          correct: false,
          label:
            "Ethanol $$1.04\\text{ kg}$$, octane $$1.68\\text{ kg}$$, $$3.2\\text{ kg}$$ carbon dioxide each",
        },
        {
          correct: false,
          label:
            "Ethanol $$1.68\\text{ kg}$$, octane $$1.04\\text{ kg}$$, carbon dioxide $$1.6$$ and $$3.2\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "Ethanol $$0.84\\text{ kg}$$, octane $$1.04\\text{ kg}$$, carbon dioxide $$1.6$$ and $$3.2\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Etanol $$1.68\\text{ kg}$$, oktana $$1.04\\text{ kg}$$, $$3.2\\text{ kg}$$ karbon dioksida setiap satu",
        },
        {
          correct: false,
          label:
            "Etanol $$1.04\\text{ kg}$$, oktana $$1.68\\text{ kg}$$, $$3.2\\text{ kg}$$ karbon dioksida setiap satu",
        },
        {
          correct: false,
          label:
            "Etanol $$1.68\\text{ kg}$$, oktana $$1.04\\text{ kg}$$, karbon dioksida $$1.6$$ dan $$3.2\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "Etanol $$0.84\\text{ kg}$$, oktana $$1.04\\text{ kg}$$, karbon dioksida $$1.6$$ dan $$3.2\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
