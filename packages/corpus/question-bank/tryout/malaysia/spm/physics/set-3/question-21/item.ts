import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.96\\text{ m s}^{-2}$$, $$4.8\\text{ m s}^{-1}$$, and it coasts $$4.6\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\text{ m s}^{-2}$$, $$7.5\\text{ m s}^{-1}$$, and it coasts $$11\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.96\\text{ m s}^{-2}$$, $$4.8\\text{ m s}^{-1}$$, and it coasts $$12\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\text{ m s}^{-2}$$, $$17\\text{ m s}^{-1}$$, and it coasts $$60\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.96\\text{ m s}^{-2}$$, $$4.8\\text{ m s}^{-1}$$, dan ia meluncur $$4.6\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$1.5\\text{ m s}^{-2}$$, $$7.5\\text{ m s}^{-1}$$, dan ia meluncur $$11\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.96\\text{ m s}^{-2}$$, $$4.8\\text{ m s}^{-1}$$, dan ia meluncur $$12\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\text{ m s}^{-2}$$, $$17\\text{ m s}^{-1}$$, dan ia meluncur $$60\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
