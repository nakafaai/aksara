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
            "$$100\\text{ cm}^3$$ and $$60\\text{ cm}^3$$, the heat denatures the enzyme, so the peroxide decomposes only at its slow uncatalysed rate",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$ and $$60\\text{ cm}^3$$, the heat denatures the enzyme, so the peroxide decomposes only at its slow uncatalysed rate",
        },
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$ and $$100\\text{ cm}^3$$, the heat denatures the enzyme, so the peroxide decomposes only at its slow uncatalysed rate",
        },
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$ and $$60\\text{ cm}^3$$, the catalase is used up as a reactant at the higher temperature",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$100\\text{ cm}^3$$ dan $$60\\text{ cm}^3$$, haba menyahaslikan enzim, jadi peroksida hanya terurai pada kadar perlahan tanpa mangkin",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$ dan $$60\\text{ cm}^3$$, haba menyahaslikan enzim, jadi peroksida hanya terurai pada kadar perlahan tanpa mangkin",
        },
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$ dan $$100\\text{ cm}^3$$, haba menyahaslikan enzim, jadi peroksida hanya terurai pada kadar perlahan tanpa mangkin",
        },
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$ dan $$60\\text{ cm}^3$$, katalase habis digunakan sebagai bahan tindak balas pada suhu lebih tinggi",
        },
      ],
    },
  },
};

export default item;
