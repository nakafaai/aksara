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
          correct: true,
          label:
            "$$83\\%$$, $$48 : 1$$, $$7.2\\text{ kJ}$$ each hour, and $$1.2\\text{ W}$$ of the loss in the secondary coil",
        },
        {
          correct: false,
          label:
            "$$100\\%$$, $$48 : 1$$, nothing wasted, and no heat in the secondary coil",
        },
        {
          correct: false,
          label:
            "$$83\\%$$, $$1 : 48$$, $$7.2\\text{ kJ}$$ each hour, and $$1.2\\text{ W}$$ of the loss in the secondary coil",
        },
        {
          correct: false,
          label:
            "$$83\\%$$, $$48 : 1$$, $$7.2\\text{ kJ}$$ each hour, and $$0.60\\text{ W}$$ of the loss in the secondary coil",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$83\\%$$, $$48 : 1$$, $$7.2\\text{ kJ}$$ setiap jam, dan $$1.2\\text{ W}$$ daripada kehilangan dalam gegelung sekunder",
        },
        {
          correct: false,
          label:
            "$$100\\%$$, $$48 : 1$$, tiada pembaziran, dan tiada haba dalam gegelung sekunder",
        },
        {
          correct: false,
          label:
            "$$83\\%$$, $$1 : 48$$, $$7.2\\text{ kJ}$$ setiap jam, dan $$1.2\\text{ W}$$ daripada kehilangan dalam gegelung sekunder",
        },
        {
          correct: false,
          label:
            "$$83\\%$$, $$48 : 1$$, $$7.2\\text{ kJ}$$ setiap jam, dan $$0.60\\text{ W}$$ daripada kehilangan dalam gegelung sekunder",
        },
      ],
    },
  },
};

export default item;
