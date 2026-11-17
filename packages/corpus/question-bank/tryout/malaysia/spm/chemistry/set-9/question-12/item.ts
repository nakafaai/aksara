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
          label: "$$\\text{XY}$$, $$1.20\\text{ g}$$, $$4825\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$1.20\\text{ g}$$, $$4825\\text{ C}$$",
        },
        {
          correct: true,
          label: "$$\\text{XY}_2$$, $$1.20\\text{ g}$$, $$9650\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$2.40\\text{ g}$$, $$9650\\text{ C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{XY}$$, $$1.20\\text{ g}$$, $$4825\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$1.20\\text{ g}$$, $$4825\\text{ C}$$",
        },
        {
          correct: true,
          label: "$$\\text{XY}_2$$, $$1.20\\text{ g}$$, $$9650\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$\\text{XY}_2$$, $$2.40\\text{ g}$$, $$9650\\text{ C}$$",
        },
      ],
    },
  },
};

export default item;
