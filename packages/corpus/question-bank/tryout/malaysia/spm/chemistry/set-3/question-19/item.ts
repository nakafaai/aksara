import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
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
            "$$12\\text{ cm}^3$$ of carbon dioxide per second, $$1.68\\text{ g}$$ of magnesium carbonate, and at least $$20\\text{ cm}^3$$ of acid",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}^3$$ of carbon dioxide per second, $$0.84\\text{ g}$$ of magnesium carbonate, and at least $$10\\text{ cm}^3$$ of acid",
        },
        {
          correct: false,
          label:
            "$$0.022\\text{ cm}^3$$ of carbon dioxide per second, $$1.68\\text{ g}$$ of magnesium carbonate, and at least $$20\\text{ cm}^3$$ of acid",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}^3$$ of carbon dioxide per second, $$1.68\\text{ g}$$ of magnesium carbonate, and at least $$10\\text{ cm}^3$$ of acid",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$12\\text{ cm}^3$$ karbon dioksida sesaat, $$1.68\\text{ g}$$ magnesium karbonat, dan sekurang-kurangnya $$20\\text{ cm}^3$$ asid",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}^3$$ karbon dioksida sesaat, $$0.84\\text{ g}$$ magnesium karbonat, dan sekurang-kurangnya $$10\\text{ cm}^3$$ asid",
        },
        {
          correct: false,
          label:
            "$$0.022\\text{ cm}^3$$ karbon dioksida sesaat, $$1.68\\text{ g}$$ magnesium karbonat, dan sekurang-kurangnya $$20\\text{ cm}^3$$ asid",
        },
        {
          correct: false,
          label:
            "$$12\\text{ cm}^3$$ karbon dioksida sesaat, $$1.68\\text{ g}$$ magnesium karbonat, dan sekurang-kurangnya $$10\\text{ cm}^3$$ asid",
        },
      ],
    },
  },
};

export default item;
