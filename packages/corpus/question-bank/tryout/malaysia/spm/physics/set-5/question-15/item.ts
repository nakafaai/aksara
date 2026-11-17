import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.0\\text{ GHz}$$, and $$2.4 \\times 10^{26}$$ photons per second",
        },
        {
          correct: true,
          label:
            "$$2.5\\text{ GHz}$$, and $$4.8 \\times 10^{26}$$ photons per second",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ GHz}$$, and $$9.7 \\times 10^{26}$$ photons per second",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ GHz}$$, and $$4.8 \\times 10^{23}$$ photons per second",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$5.0\\text{ GHz}$$, dan $$2.4 \\times 10^{26}$$ foton sesaat",
        },
        {
          correct: true,
          label:
            "$$2.5\\text{ GHz}$$, dan $$4.8 \\times 10^{26}$$ foton sesaat",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ GHz}$$, dan $$9.7 \\times 10^{26}$$ foton sesaat",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ GHz}$$, dan $$4.8 \\times 10^{23}$$ foton sesaat",
        },
      ],
    },
  },
};

export default item;
