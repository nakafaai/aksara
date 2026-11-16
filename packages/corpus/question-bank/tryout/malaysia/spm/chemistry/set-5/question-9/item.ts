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
          label: "Aluminium, and its oxide reacts only with acids",
        },
        {
          correct: false,
          label: "Phosphorus, and its oxide reacts only with alkalis",
        },
        {
          correct: false,
          label: "Magnesium, and its oxide reacts only with acids",
        },
        {
          correct: true,
          label: "Aluminium, and its oxide reacts with both acids and alkalis",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Aluminium, dan oksidanya bertindak balas dengan asid sahaja",
        },
        {
          correct: false,
          label: "Fosforus, dan oksidanya bertindak balas dengan alkali sahaja",
        },
        {
          correct: false,
          label: "Magnesium, dan oksidanya bertindak balas dengan asid sahaja",
        },
        {
          correct: true,
          label:
            "Aluminium, dan oksidanya bertindak balas dengan asid dan alkali",
        },
      ],
    },
  },
};

export default item;
