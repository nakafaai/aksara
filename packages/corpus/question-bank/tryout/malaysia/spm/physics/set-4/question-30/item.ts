import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$55\\text{ kJ}$$, about $$1.0\\text{ h}$$, and $$9.8\\text{ kJ}$$ of heat in the charger",
        },
        {
          correct: false,
          label:
            "$$55\\text{ kJ}$$, about $$2.0\\text{ h}$$, and $$19\\text{ kJ}$$ of heat in the charger",
        },
        {
          correct: false,
          label:
            "$$55\\text{ kJ}$$, about $$1.0\\text{ h}$$, and $$8.3\\text{ kJ}$$ of heat in the charger",
        },
        {
          correct: false,
          label:
            "$$55\\text{ kJ}$$, about $$0.73\\text{ h}$$, and $$7.1\\text{ kJ}$$ of heat in the charger",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$55\\text{ kJ}$$, kira-kira $$1.0\\text{ j}$$, dan $$9.8\\text{ kJ}$$ haba dalam pengecas",
        },
        {
          correct: false,
          label:
            "$$55\\text{ kJ}$$, kira-kira $$2.0\\text{ j}$$, dan $$19\\text{ kJ}$$ haba dalam pengecas",
        },
        {
          correct: false,
          label:
            "$$55\\text{ kJ}$$, kira-kira $$1.0\\text{ j}$$, dan $$8.3\\text{ kJ}$$ haba dalam pengecas",
        },
        {
          correct: false,
          label:
            "$$55\\text{ kJ}$$, kira-kira $$0.73\\text{ j}$$, dan $$7.1\\text{ kJ}$$ haba dalam pengecas",
        },
      ],
    },
  },
};

export default item;
