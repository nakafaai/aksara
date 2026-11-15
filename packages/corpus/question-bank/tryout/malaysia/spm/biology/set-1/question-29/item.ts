import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "adaptations-of-plants-in-different-habitats",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.4$$ times, R",
        },
        {
          correct: false,
          label: "$$4.9$$ times, S",
        },
        {
          correct: false,
          label: "$$2.0$$ times, R",
        },
        {
          correct: true,
          label: "$$4.9$$ times, R",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.4$$ kali, R",
        },
        {
          correct: false,
          label: "$$4.9$$ kali, S",
        },
        {
          correct: false,
          label: "$$2.0$$ kali, R",
        },
        {
          correct: true,
          label: "$$4.9$$ kali, R",
        },
      ],
    },
  },
};

export default item;
