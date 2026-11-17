import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$73\\text{ Hz}$$, and $$0.44$$ times the tension",
        },
        {
          correct: false,
          label: "$$83\\text{ Hz}$$, and $$0.57$$ times the tension",
        },
        {
          correct: false,
          label: "$$146\\text{ Hz}$$, and $$1.3$$ times the tension",
        },
        {
          correct: true,
          label: "$$146\\text{ Hz}$$, and $$1.8$$ times the tension",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$73\\text{ Hz}$$, dan $$0.44$$ kali tegangan",
        },
        {
          correct: false,
          label: "$$83\\text{ Hz}$$, dan $$0.57$$ kali tegangan",
        },
        {
          correct: false,
          label: "$$146\\text{ Hz}$$, dan $$1.3$$ kali tegangan",
        },
        {
          correct: true,
          label: "$$146\\text{ Hz}$$, dan $$1.8$$ kali tegangan",
        },
      ],
    },
  },
};

export default item;
