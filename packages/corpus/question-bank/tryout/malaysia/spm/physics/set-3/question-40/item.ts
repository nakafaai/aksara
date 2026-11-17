import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{16}$$, and only the red laser, because it sends more photons each second",
        },
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{19}$$, and only the green laser, with up to $$6.3 \\times 10^{-20}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$1.6 \\times 10^{16}$$, and only the green laser, with up to $$6.3 \\times 10^{-20}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{16}$$, and only the green laser, with up to $$3.8 \\times 10^{-19}\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{16}$$, dan hanya laser merah, kerana ia menghantar lebih banyak foton setiap saat",
        },
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{19}$$, dan hanya laser hijau, dengan sehingga $$6.3 \\times 10^{-20}\\text{ J}$$",
        },
        {
          correct: true,
          label:
            "$$1.6 \\times 10^{16}$$, dan hanya laser hijau, dengan sehingga $$6.3 \\times 10^{-20}\\text{ J}$$",
        },
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{16}$$, dan hanya laser hijau, dengan sehingga $$3.8 \\times 10^{-19}\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
