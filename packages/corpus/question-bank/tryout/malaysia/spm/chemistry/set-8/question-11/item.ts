import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Water $$240\\text{ cm}^3$$, methylbenzene $$0\\text{ cm}^3$$, pH $$1.0$$",
        },
        {
          correct: false,
          label:
            "Water $$120\\text{ cm}^3$$, methylbenzene $$120\\text{ cm}^3$$, pH $$1.0$$",
        },
        {
          correct: false,
          label:
            "Water $$120\\text{ cm}^3$$, methylbenzene $$0\\text{ cm}^3$$, pH $$2.0$$",
        },
        {
          correct: true,
          label:
            "Water $$120\\text{ cm}^3$$, methylbenzene $$0\\text{ cm}^3$$, pH $$1.0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Air $$240\\text{ cm}^3$$, metilbenzena $$0\\text{ cm}^3$$, pH $$1.0$$",
        },
        {
          correct: false,
          label:
            "Air $$120\\text{ cm}^3$$, metilbenzena $$120\\text{ cm}^3$$, pH $$1.0$$",
        },
        {
          correct: false,
          label:
            "Air $$120\\text{ cm}^3$$, metilbenzena $$0\\text{ cm}^3$$, pH $$2.0$$",
        },
        {
          correct: true,
          label:
            "Air $$120\\text{ cm}^3$$, metilbenzena $$0\\text{ cm}^3$$, pH $$1.0$$",
        },
      ],
    },
  },
};

export default item;
