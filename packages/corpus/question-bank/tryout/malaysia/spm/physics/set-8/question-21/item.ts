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
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$2.0\\text{ kg}$$ and $$3.3\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$1.2\\text{ kg}$$, $$2.8\\text{ kg}$$ and $$3.3\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$2.8\\text{ kg}$$ and $$3.0\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$2.8\\text{ kg}$$ and $$3.2\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$2.0\\text{ kg}$$ dan $$3.3\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$1.2\\text{ kg}$$, $$2.8\\text{ kg}$$ dan $$3.3\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$2.8\\text{ kg}$$ dan $$3.0\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$2.8\\text{ kg}$$ dan $$3.2\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
