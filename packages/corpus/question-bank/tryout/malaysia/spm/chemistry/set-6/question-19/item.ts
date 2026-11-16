import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$1.5\\text{ cm}^3\\text{ s}^{-1}$$, the heat denatures the enzyme, so the peroxide decomposes only at its slow uncatalysed rate",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, the heat denatures the enzyme, so the peroxide decomposes only at its slow uncatalysed rate",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, the heat denatures the enzyme, so the peroxide decomposes only at its slow uncatalysed rate",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$1.5\\text{ cm}^3\\text{ s}^{-1}$$, the catalase is used up as a reactant at the higher temperature",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$1.5\\text{ cm}^3\\text{ s}^{-1}$$, haba menyahaslikan enzim, jadi peroksida hanya terurai pada kadar perlahan tanpa mangkin",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, haba menyahaslikan enzim, jadi peroksida hanya terurai pada kadar perlahan tanpa mangkin",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, haba menyahaslikan enzim, jadi peroksida hanya terurai pada kadar perlahan tanpa mangkin",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$1.5\\text{ cm}^3\\text{ s}^{-1}$$, katalase habis digunakan sebagai bahan tindak balas pada suhu lebih tinggi",
        },
      ],
    },
  },
};

export default item;
