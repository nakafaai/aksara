import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "It decreases by $$0.010\\text{ g}$$",
        },
        {
          correct: false,
          label: "It increases by $$0.64\\text{ g}$$",
        },
        {
          correct: false,
          label: "It decreases by $$0.65\\text{ g}$$",
        },
        {
          correct: false,
          label: "It increases by $$0.010\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Berkurang sebanyak $$0.010\\text{ g}$$",
        },
        {
          correct: false,
          label: "Bertambah sebanyak $$0.64\\text{ g}$$",
        },
        {
          correct: false,
          label: "Berkurang sebanyak $$0.65\\text{ g}$$",
        },
        {
          correct: false,
          label: "Bertambah sebanyak $$0.010\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
