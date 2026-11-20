import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$5.5\\times10^{-3}\\text{ m s}^{-2}$$ towards the Earth and $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$1.2\\times10^{-2}\\text{ m s}^{-2}$$ towards the Moon and $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$5.5\\times10^{-3}\\text{ m s}^{-2}$$ towards the Moon and $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$5.5\\times10^{-3}\\text{ m s}^{-2}$$ towards the Moon and $$0.12\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$5.5\\times10^{-3}\\text{ m s}^{-2}$$ ke arah Bumi dan $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$1.2\\times10^{-2}\\text{ m s}^{-2}$$ ke arah Bulan dan $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$5.5\\times10^{-3}\\text{ m s}^{-2}$$ ke arah Bulan dan $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$5.5\\times10^{-3}\\text{ m s}^{-2}$$ ke arah Bulan dan $$0.12\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
