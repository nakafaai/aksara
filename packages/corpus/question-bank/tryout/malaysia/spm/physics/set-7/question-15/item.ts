import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$500\\text{ m}$$, the FM station" },
        { correct: true, label: "$$500\\text{ m}$$, the AM station" },
        {
          correct: false,
          label: "$$2.0\\times10^{-3}\\text{ m}$$, the AM station",
        },
        { correct: false, label: "$$3.0\\text{ m}$$, the AM station" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$500\\text{ m}$$, stesen FM" },
        { correct: true, label: "$$500\\text{ m}$$, stesen AM" },
        { correct: false, label: "$$2.0\\times10^{-3}\\text{ m}$$, stesen AM" },
        { correct: false, label: "$$3.0\\text{ m}$$, stesen AM" },
      ],
    },
  },
};

export default item;
