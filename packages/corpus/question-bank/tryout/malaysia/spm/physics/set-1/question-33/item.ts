import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.0\\text{ A}$$, towards the west",
        },
        {
          correct: false,
          label: "$$0.20\\text{ A}$$, towards the east",
        },
        {
          correct: false,
          label: "$$2000\\text{ A}$$, towards the east",
        },
        {
          correct: true,
          label: "$$2.0\\text{ A}$$, towards the east",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.0\\text{ A}$$, ke arah barat",
        },
        {
          correct: false,
          label: "$$0.20\\text{ A}$$, ke arah timur",
        },
        {
          correct: false,
          label: "$$2000\\text{ A}$$, ke arah timur",
        },
        {
          correct: true,
          label: "$$2.0\\text{ A}$$, ke arah timur",
        },
      ],
    },
  },
};

export default item;
