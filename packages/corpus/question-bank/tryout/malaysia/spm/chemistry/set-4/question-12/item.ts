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
            "The hydrate is $$28.1\\%$$ sulfur by mass, and the solution holds $$0.30\\text{ mol}$$ of sulfate ions",
        },
        {
          correct: true,
          label:
            "The hydrate is $$14.4\\%$$ sulfur by mass, and the solution holds $$0.30\\text{ mol}$$ of sulfate ions",
        },
        {
          correct: false,
          label:
            "The hydrate is $$14.4\\%$$ sulfur by mass, and the solution holds $$0.10\\text{ mol}$$ of sulfate ions",
        },
        {
          correct: false,
          label:
            "The hydrate is $$4.8\\%$$ sulfur by mass, and the solution holds $$0.10\\text{ mol}$$ of sulfate ions",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hidrat itu mengandungi $$28.1\\%$$ sulfur mengikut jisim, dan larutan mengandungi $$0.30\\text{ mol}$$ ion sulfat",
        },
        {
          correct: true,
          label:
            "Hidrat itu mengandungi $$14.4\\%$$ sulfur mengikut jisim, dan larutan mengandungi $$0.30\\text{ mol}$$ ion sulfat",
        },
        {
          correct: false,
          label:
            "Hidrat itu mengandungi $$14.4\\%$$ sulfur mengikut jisim, dan larutan mengandungi $$0.10\\text{ mol}$$ ion sulfat",
        },
        {
          correct: false,
          label:
            "Hidrat itu mengandungi $$4.8\\%$$ sulfur mengikut jisim, dan larutan mengandungi $$0.10\\text{ mol}$$ ion sulfat",
        },
      ],
    },
  },
};

export default item;
