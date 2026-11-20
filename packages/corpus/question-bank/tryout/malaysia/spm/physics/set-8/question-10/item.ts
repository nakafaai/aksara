import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$179$$ °C, $$100$$ °C and $$0.11\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$179$$ °C, $$179$$ °C and $$0\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$179$$ °C, $$100$$ °C and $$0.13\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$179$$ °C, $$100$$ °C and $$0.19\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$179$$ °C, $$100$$ °C dan $$0.11\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$179$$ °C, $$179$$ °C dan $$0\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$179$$ °C, $$100$$ °C dan $$0.13\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$179$$ °C, $$100$$ °C dan $$0.19\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
