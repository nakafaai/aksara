import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  stimulus: "gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Its reading shows how hard the rain was falling at the moment it is read.",
        },
        {
          correct: false,
          label:
            "Any gauge made from a $$2$$-litre bottle will have marks $$2$$ mm apart for each millimetre of rain.",
        },
        {
          correct: false,
          label:
            "Water standing $$10$$ mm above the zero line means that $$10$$ mm of rain fell.",
        },
        {
          correct: false,
          label:
            "A gauge placed close to a wall will always give readings that are too high.",
        },
        {
          correct: true,
          label:
            "Water standing $$15$$ mm above the zero line one morning means $$7.5$$ mm of rain fell since the last emptying.",
        },
      ],
    },
  },
};

export default item;
