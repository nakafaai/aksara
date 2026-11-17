import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$12.0\\text{ V}$$, $$2.1\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ and $$16\\%$$",
        },
        {
          correct: false,
          label:
            "$$12.8\\text{ V}$$, $$2.3\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ and $$8\\%$$",
        },
        {
          correct: false,
          label:
            "$$12.0\\text{ V}$$, $$2.4\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ and $$3\\%$$",
        },
        {
          correct: false,
          label:
            "$$12.0\\text{ V}$$, $$2.1\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ and $$13\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$12.0\\text{ V}$$, $$2.1\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ dan $$16\\%$$",
        },
        {
          correct: false,
          label:
            "$$12.8\\text{ V}$$, $$2.3\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ dan $$8\\%$$",
        },
        {
          correct: false,
          label:
            "$$12.0\\text{ V}$$, $$2.4\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ dan $$3\\%$$",
        },
        {
          correct: false,
          label:
            "$$12.0\\text{ V}$$, $$2.1\\times10^{3}\\text{ J kg}^{-1}\\text{ °C}^{-1}$$ dan $$13\\%$$",
        },
      ],
    },
  },
};

export default item;
