import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1200\\text{ cm}^3$$, pale green to yellowish brown",
        },
        {
          correct: true,
          label: "$$600\\text{ cm}^3$$, pale green to yellowish brown",
        },
        {
          correct: false,
          label: "$$600\\text{ cm}^3$$, yellowish brown to pale green",
        },
        {
          correct: false,
          label: "$$300\\text{ cm}^3$$, pale green to yellowish brown",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1200\\text{ cm}^3$$, hijau pucat kepada perang kekuningan",
        },
        {
          correct: true,
          label: "$$600\\text{ cm}^3$$, hijau pucat kepada perang kekuningan",
        },
        {
          correct: false,
          label: "$$600\\text{ cm}^3$$, perang kekuningan kepada hijau pucat",
        },
        {
          correct: false,
          label: "$$300\\text{ cm}^3$$, hijau pucat kepada perang kekuningan",
        },
      ],
    },
  },
};

export default item;
