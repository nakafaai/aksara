import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.612\\text{ g}$$, $$1.21\\text{ g}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.22\\text{ g}$$, $$2.42\\text{ g}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$1.22\\text{ g}$$, $$1.21\\text{ g}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.22\\text{ g}$$, $$1.21\\text{ g}$$, $$0.424\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.612\\text{ g}$$, $$1.21\\text{ g}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.22\\text{ g}$$, $$2.42\\text{ g}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$1.22\\text{ g}$$, $$1.21\\text{ g}$$, $$0.212\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.22\\text{ g}$$, $$1.21\\text{ g}$$, $$0.424\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
