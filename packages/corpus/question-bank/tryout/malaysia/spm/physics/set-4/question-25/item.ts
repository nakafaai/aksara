import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$200\\text{ g}$$, and the block stays just under the surface",
        },
        {
          correct: true,
          label:
            "$$200\\text{ g}$$, and $$67\\text{ cm}^3$$ of the block rises above the water",
        },
        {
          correct: false,
          label:
            "$$300\\text{ g}$$, and $$100\\text{ cm}^3$$ of the block rises above the water",
        },
        {
          correct: false,
          label:
            "$$200\\text{ g}$$, and $$200\\text{ cm}^3$$ of the block rises above the water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$200\\text{ g}$$, dan blok kekal tepat di bawah permukaan",
        },
        {
          correct: true,
          label:
            "$$200\\text{ g}$$, dan $$67\\text{ cm}^3$$ blok timbul di atas air",
        },
        {
          correct: false,
          label:
            "$$300\\text{ g}$$, dan $$100\\text{ cm}^3$$ blok timbul di atas air",
        },
        {
          correct: false,
          label:
            "$$200\\text{ g}$$, dan $$200\\text{ cm}^3$$ blok timbul di atas air",
        },
      ],
    },
  },
};

export default item;
