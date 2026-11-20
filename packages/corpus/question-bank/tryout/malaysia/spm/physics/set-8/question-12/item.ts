import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.20\\text{ kg}$$, $$2.9\\text{ °C}$$, and water at $$-0.90\\text{ °C}$$",
        },
        {
          correct: true,
          label:
            "$$0.20\\text{ kg}$$, $$2.9\\text{ °C}$$, and water at $$0\\text{ °C}$$ with $$5.0\\text{ g}$$ of ice",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ kg}$$, $$2.9\\text{ °C}$$, and water at $$0\\text{ °C}$$ with $$106\\text{ g}$$ of ice",
        },
        {
          correct: false,
          label:
            "$$0.18\\text{ kg}$$, $$2.9\\text{ °C}$$, and water at $$0\\text{ °C}$$ with $$5.0\\text{ g}$$ of ice",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.20\\text{ kg}$$, $$2.9\\text{ °C}$$, dan air pada $$-0.90\\text{ °C}$$",
        },
        {
          correct: true,
          label:
            "$$0.20\\text{ kg}$$, $$2.9\\text{ °C}$$, dan air pada $$0\\text{ °C}$$ dengan $$5.0\\text{ g}$$ ais",
        },
        {
          correct: false,
          label:
            "$$0.20\\text{ kg}$$, $$2.9\\text{ °C}$$, dan air pada $$0\\text{ °C}$$ dengan $$106\\text{ g}$$ ais",
        },
        {
          correct: false,
          label:
            "$$0.18\\text{ kg}$$, $$2.9\\text{ °C}$$, dan air pada $$0\\text{ °C}$$ dengan $$5.0\\text{ g}$$ ais",
        },
      ],
    },
  },
};

export default item;
