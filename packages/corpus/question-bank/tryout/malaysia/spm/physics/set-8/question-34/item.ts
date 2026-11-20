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
          label:
            "$$36.4\\text{ A}$$, $$2.2\\text{ C}$$, and the ring jumps off the coil",
        },
        {
          correct: false,
          label:
            "$$36.4\\text{ A}$$, $$0.55\\text{ C}$$, and the ring jumps off as high as in the first trial",
        },
        {
          correct: true,
          label:
            "$$36.4\\text{ A}$$, $$0.55\\text{ C}$$, and the ring stays on the coil",
        },
        {
          correct: false,
          label:
            "$$18.2\\text{ A}$$, $$0.27\\text{ C}$$, and the ring stays on the coil",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$36.4\\text{ A}$$, $$2.2\\text{ C}$$, dan cincin itu melompat meninggalkan gegelung",
        },
        {
          correct: false,
          label:
            "$$36.4\\text{ A}$$, $$0.55\\text{ C}$$, dan cincin itu melompat setinggi dalam cubaan pertama",
        },
        {
          correct: true,
          label:
            "$$36.4\\text{ A}$$, $$0.55\\text{ C}$$, dan cincin itu kekal di atas gegelung",
        },
        {
          correct: false,
          label:
            "$$18.2\\text{ A}$$, $$0.27\\text{ C}$$, dan cincin itu kekal di atas gegelung",
        },
      ],
    },
  },
};

export default item;
