import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6.0$$ days, $$24$$ days and $$100\\text{ MBq}$$",
        },
        {
          correct: false,
          label: "$$6.0$$ days, $$24$$ days and $$1.50\\text{ GBq}$$",
        },
        {
          correct: false,
          label: "$$6.0$$ days, $$24$$ days and $$200\\text{ MBq}$$",
        },
        {
          correct: false,
          label: "$$8.0$$ days, $$32$$ days and $$0\\text{ Bq}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6.0$$ hari, $$24$$ hari dan $$100\\text{ MBq}$$",
        },
        {
          correct: false,
          label: "$$6.0$$ hari, $$24$$ hari dan $$1.50\\text{ GBq}$$",
        },
        {
          correct: false,
          label: "$$6.0$$ hari, $$24$$ hari dan $$200\\text{ MBq}$$",
        },
        {
          correct: false,
          label: "$$8.0$$ hari, $$32$$ hari dan $$0\\text{ Bq}$$",
        },
      ],
    },
  },
};

export default item;
