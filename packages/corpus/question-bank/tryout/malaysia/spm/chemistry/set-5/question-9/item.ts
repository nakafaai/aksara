import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{AlCl}_3$$ molecules, $$440\\text{ cm}^3$$, an oxide that reacts with acids and alkalis",
        },
        {
          correct: false,
          label:
            "$$\\text{Al}_2\\text{Cl}_6$$ molecules, $$440\\text{ cm}^3$$, an oxide that reacts with acids and alkalis",
        },
        {
          correct: false,
          label:
            "$$\\text{Al}_2\\text{Cl}_6$$ molecules, $$880\\text{ cm}^3$$, an oxide that reacts with acids only",
        },
        {
          correct: true,
          label:
            "$$\\text{Al}_2\\text{Cl}_6$$ molecules, $$880\\text{ cm}^3$$, an oxide that reacts with acids and alkalis",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Molekul $$\\text{AlCl}_3$$, $$440\\text{ cm}^3$$, oksida yang bertindak balas dengan asid dan alkali",
        },
        {
          correct: false,
          label:
            "Molekul $$\\text{Al}_2\\text{Cl}_6$$, $$440\\text{ cm}^3$$, oksida yang bertindak balas dengan asid dan alkali",
        },
        {
          correct: false,
          label:
            "Molekul $$\\text{Al}_2\\text{Cl}_6$$, $$880\\text{ cm}^3$$, oksida yang bertindak balas dengan asid sahaja",
        },
        {
          correct: true,
          label:
            "Molekul $$\\text{Al}_2\\text{Cl}_6$$, $$880\\text{ cm}^3$$, oksida yang bertindak balas dengan asid dan alkali",
        },
      ],
    },
  },
};

export default item;
