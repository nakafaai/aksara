import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The class tested how holding the mixture at $$37^{\\circ}\\text{C}$$ affected enzyme activity in a classroom model, while controlling the listed factors but treating one short trial as proof of a universal effect.",
        },
        {
          correct: true,
          label:
            "The class found a higher colour-change score at $$37^{\\circ}\\text{C}$$ under controlled conditions, while eye-based estimation limited the precision and reach of the conclusion.",
        },
        {
          correct: false,
          label:
            "The class tested how holding the mixture at $$37^{\\circ}\\text{C}$$ affected enzyme activity in a classroom model, while reporting the limitation but leaving the comparison conditions out of the interpretation.",
        },
        {
          correct: false,
          label:
            "The class tested how holding the mixture at $$37^{\\circ}\\text{C}$$ affected enzyme activity in a classroom model, while treating the scientific term as the measured outcome that settles the investigation.",
        },
        {
          correct: false,
          label:
            "The class tested how holding the mixture at $$37^{\\circ}\\text{C}$$ affected enzyme activity in a classroom model, while using the comparison only to confirm the initial hypothesis and excluding the remaining uncertainty.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
