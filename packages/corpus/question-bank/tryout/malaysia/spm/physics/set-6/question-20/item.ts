import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16\\text{ cm}$$, and $$2.0\\text{ mm}$$ towards the mirror",
        },
        {
          correct: false,
          label: "$$1.9\\text{ m}$$, and $$1.8\\text{ mm}$$ towards the mirror",
        },
        {
          correct: true,
          label: "$$1.7\\text{ m}$$, and $$1.8\\text{ mm}$$ towards the mirror",
        },
        {
          correct: false,
          label:
            "$$1.7\\text{ m}$$, and $$1.8\\text{ mm}$$ away from the mirror",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16\\text{ cm}$$, dan $$2.0\\text{ mm}$$ ke arah cermin",
        },
        {
          correct: false,
          label: "$$1.9\\text{ m}$$, dan $$1.8\\text{ mm}$$ ke arah cermin",
        },
        {
          correct: true,
          label: "$$1.7\\text{ m}$$, dan $$1.8\\text{ mm}$$ ke arah cermin",
        },
        {
          correct: false,
          label: "$$1.7\\text{ m}$$, dan $$1.8\\text{ mm}$$ menjauhi cermin",
        },
      ],
    },
  },
};

export default item;
