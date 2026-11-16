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
            "$$\\text{AlCl}_3$$ molecules, and an oxide that reacts with both acids and alkalis",
        },
        {
          correct: false,
          label:
            "$$\\text{Al}_2\\text{Cl}_6$$ molecules, and an oxide that reacts only with acids",
        },
        {
          correct: false,
          label:
            "$$\\text{Al}_2\\text{Cl}_6$$ molecules, and an oxide that reacts only with alkalis",
        },
        {
          correct: true,
          label:
            "$$\\text{Al}_2\\text{Cl}_6$$ molecules, and an oxide that reacts with both acids and alkalis",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Molekul $$\\text{AlCl}_3$$, dan oksida yang bertindak balas dengan asid dan alkali",
        },
        {
          correct: false,
          label:
            "Molekul $$\\text{Al}_2\\text{Cl}_6$$, dan oksida yang bertindak balas dengan asid sahaja",
        },
        {
          correct: false,
          label:
            "Molekul $$\\text{Al}_2\\text{Cl}_6$$, dan oksida yang bertindak balas dengan alkali sahaja",
        },
        {
          correct: true,
          label:
            "Molekul $$\\text{Al}_2\\text{Cl}_6$$, dan oksida yang bertindak balas dengan asid dan alkali",
        },
      ],
    },
  },
};

export default item;
