import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$300\\text{ kJ}$$, $$750\\text{ C}$$ and $$150\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$180\\text{ kJ}$$, $$450\\text{ C}$$ and $$2250\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$9.0\\text{ kJ}$$, $$23\\text{ C}$$ and $$4.5\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$180\\text{ kJ}$$, $$450\\text{ C}$$ and $$90\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$300\\text{ kJ}$$, $$750\\text{ C}$$ dan $$150\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$180\\text{ kJ}$$, $$450\\text{ C}$$ dan $$2250\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$9.0\\text{ kJ}$$, $$23\\text{ C}$$ dan $$4.5\\text{ A}$$",
        },
        {
          correct: true,
          label: "$$180\\text{ kJ}$$, $$450\\text{ C}$$ dan $$90\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
