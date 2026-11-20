import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$34\\%$$, $$26\\text{ kJ}$$ and $$57\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$100\\%$$, $$35\\text{ kJ}$$ and $$87\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$34\\%$$, $$8.8\\text{ kJ}$$ and $$29\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$34\\%$$, $$26\\text{ kJ}$$ and $$87\\text{ min}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$34\\%$$, $$26\\text{ kJ}$$ dan $$57\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$100\\%$$, $$35\\text{ kJ}$$ dan $$87\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$34\\%$$, $$8.8\\text{ kJ}$$ dan $$29\\text{ min}$$",
        },
        {
          correct: false,
          label: "$$34\\%$$, $$26\\text{ kJ}$$ dan $$87\\text{ min}$$",
        },
      ],
    },
  },
};

export default item;
