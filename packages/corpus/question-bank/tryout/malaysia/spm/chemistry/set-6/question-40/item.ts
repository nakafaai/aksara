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
        { correct: false, label: "$$108\\text{ mg}$$, $$36.0\\%$$" },
        { correct: false, label: "$$1080\\text{ mg}$$, $$360\\%$$" },
        { correct: true, label: "$$270\\text{ mg}$$, $$90.0\\%$$" },
        { correct: false, label: "$$270\\text{ mg}$$, $$111\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$108\\text{ mg}$$, $$36.0\\%$$" },
        { correct: false, label: "$$1080\\text{ mg}$$, $$360\\%$$" },
        { correct: true, label: "$$270\\text{ mg}$$, $$90.0\\%$$" },
        { correct: false, label: "$$270\\text{ mg}$$, $$111\\%$$" },
      ],
    },
  },
};

export default item;
