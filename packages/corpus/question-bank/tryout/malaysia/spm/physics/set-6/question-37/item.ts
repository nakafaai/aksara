import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$34\\text{ W}$$, and $$4.8\\text{ kg}$$" },
        { correct: false, label: "$$67\\text{ W}$$, and $$2.4\\text{ kg}$$" },
        { correct: false, label: "$$560\\text{ W}$$, and $$0.29\\text{ kg}$$" },
        { correct: false, label: "$$34\\text{ W}$$, and $$1.2\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$34\\text{ W}$$, dan $$4.8\\text{ kg}$$" },
        { correct: false, label: "$$67\\text{ W}$$, dan $$2.4\\text{ kg}$$" },
        { correct: false, label: "$$560\\text{ W}$$, dan $$0.29\\text{ kg}$$" },
        { correct: false, label: "$$34\\text{ W}$$, dan $$1.2\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
