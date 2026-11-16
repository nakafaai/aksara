import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$270\\text{ mg}$$, $$90.0\\%$$" },
        { correct: false, label: "$$103\\text{ mg}$$, $$34.2\\%$$" },
        { correct: true, label: "$$257\\text{ mg}$$, $$85.5\\%$$" },
        { correct: false, label: "$$1026\\text{ mg}$$, $$342\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$270\\text{ mg}$$, $$90.0\\%$$" },
        { correct: false, label: "$$103\\text{ mg}$$, $$34.2\\%$$" },
        { correct: true, label: "$$257\\text{ mg}$$, $$85.5\\%$$" },
        { correct: false, label: "$$1026\\text{ mg}$$, $$342\\%$$" },
      ],
    },
  },
};

export default item;
