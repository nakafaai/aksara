import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.0\\text{ m}$$ above the diver, approaching at $$2.0\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$6.0\\text{ m}$$ above the diver, approaching at $$2.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.25\\text{ m}$$ above the diver, approaching at $$1.5\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m}$$ above the diver, approaching at $$2.7\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.0\\text{ m}$$ di atas penyelam, mendekat pada $$2.0\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$6.0\\text{ m}$$ di atas penyelam, mendekat pada $$2.7\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.25\\text{ m}$$ di atas penyelam, mendekat pada $$1.5\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ m}$$ di atas penyelam, mendekat pada $$2.7\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
