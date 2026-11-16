import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.10\\text{ mol dm}^{-3}$$, used at $$1.5 \\times 10^{-4}\\text{ mol s}^{-1}$$, and the repeat still gives $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ mol dm}^{-3}$$, used at $$1.5 \\times 10^{-4}\\text{ mol s}^{-1}$$, and the repeat still gives $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ mol dm}^{-3}$$, used at $$3.0 \\times 10^{-4}\\text{ mol s}^{-1}$$, and the repeat gives only $$60\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.20\\text{ mol dm}^{-3}$$, used at $$3.0 \\times 10^{-4}\\text{ mol s}^{-1}$$, and the repeat still gives $$120\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.10\\text{ mol dm}^{-3}$$, digunakan pada $$1.5 \\times 10^{-4}\\text{ mol s}^{-1}$$, dan ulangan tetap memberi $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ mol dm}^{-3}$$, digunakan pada $$1.5 \\times 10^{-4}\\text{ mol s}^{-1}$$, dan ulangan tetap memberi $$120\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ mol dm}^{-3}$$, digunakan pada $$3.0 \\times 10^{-4}\\text{ mol s}^{-1}$$, dan ulangan hanya memberi $$60\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.20\\text{ mol dm}^{-3}$$, digunakan pada $$3.0 \\times 10^{-4}\\text{ mol s}^{-1}$$, dan ulangan tetap memberi $$120\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
