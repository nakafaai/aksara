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
        {
          correct: false,
          label:
            "$$1088\\text{ m}$$, $$3.2\\text{ s}$$ and less than $$8.5\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$544\\text{ m}$$, $$3.2\\text{ s}$$ and less than $$8.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$544\\text{ m}$$, $$3.2\\text{ s}$$ and less than $$17\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$544\\text{ m}$$, $$0.8\\text{ s}$$ and less than $$8.5\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1088\\text{ m}$$, $$3.2\\text{ s}$$ dan kurang daripada $$8.5\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$544\\text{ m}$$, $$3.2\\text{ s}$$ dan kurang daripada $$8.5\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$544\\text{ m}$$, $$3.2\\text{ s}$$ dan kurang daripada $$17\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$544\\text{ m}$$, $$0.8\\text{ s}$$ dan kurang daripada $$8.5\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
