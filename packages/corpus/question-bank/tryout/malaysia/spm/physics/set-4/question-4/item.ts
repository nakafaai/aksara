import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$60\\text{ m s}^{-1}$$, landing $$180\\text{ m}$$ ahead, with $$3600\\text{ J}$$ released",
        },
        {
          correct: false,
          label:
            "$$40\\text{ m s}^{-1}$$, landing $$120\\text{ m}$$ ahead, with no energy released",
        },
        {
          correct: false,
          label:
            "$$60\\text{ m s}^{-1}$$, landing $$180\\text{ m}$$ ahead, with $$2400\\text{ J}$$ released",
        },
        {
          correct: true,
          label:
            "$$60\\text{ m s}^{-1}$$, landing $$180\\text{ m}$$ ahead, with $$1200\\text{ J}$$ released",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$60\\text{ m s}^{-1}$$, mendarat $$180\\text{ m}$$ di hadapan, dengan $$3600\\text{ J}$$ dibebaskan",
        },
        {
          correct: false,
          label:
            "$$40\\text{ m s}^{-1}$$, mendarat $$120\\text{ m}$$ di hadapan, tanpa tenaga dibebaskan",
        },
        {
          correct: false,
          label:
            "$$60\\text{ m s}^{-1}$$, mendarat $$180\\text{ m}$$ di hadapan, dengan $$2400\\text{ J}$$ dibebaskan",
        },
        {
          correct: true,
          label:
            "$$60\\text{ m s}^{-1}$$, mendarat $$180\\text{ m}$$ di hadapan, dengan $$1200\\text{ J}$$ dibebaskan",
        },
      ],
    },
  },
};

export default item;
