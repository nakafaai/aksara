import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$ lamps, wasting $$194\\text{ kJ}$$ each hour",
        },
        {
          correct: true,
          label: "$$5$$ lamps, wasting $$162\\text{ kJ}$$ each hour",
        },
        {
          correct: false,
          label: "$$5$$ lamps, wasting $$173\\text{ kJ}$$ each hour",
        },
        {
          correct: false,
          label: "$$5$$ lamps, wasting $$130\\text{ kJ}$$ each hour",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$ lampu, membazirkan $$194\\text{ kJ}$$ setiap jam",
        },
        {
          correct: true,
          label: "$$5$$ lampu, membazirkan $$162\\text{ kJ}$$ setiap jam",
        },
        {
          correct: false,
          label: "$$5$$ lampu, membazirkan $$173\\text{ kJ}$$ setiap jam",
        },
        {
          correct: false,
          label: "$$5$$ lampu, membazirkan $$130\\text{ kJ}$$ setiap jam",
        },
      ],
    },
  },
};

export default item;
