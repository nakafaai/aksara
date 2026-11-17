import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$545\\text{ nm}$$, and $$15$$" },
        { correct: false, label: "$$600\\text{ nm}$$, and $$13$$" },
        { correct: true, label: "$$600\\text{ nm}$$, and $$14$$" },
        { correct: false, label: "$$600\\text{ nm}$$, and $$11$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$545\\text{ nm}$$, dan $$15$$" },
        { correct: false, label: "$$600\\text{ nm}$$, dan $$13$$" },
        { correct: true, label: "$$600\\text{ nm}$$, dan $$14$$" },
        { correct: false, label: "$$600\\text{ nm}$$, dan $$11$$" },
      ],
    },
  },
};

export default item;
