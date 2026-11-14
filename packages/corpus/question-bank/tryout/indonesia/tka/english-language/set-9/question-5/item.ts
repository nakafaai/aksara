import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "fact-opinion",
  },
  stimulus: "stilt-house",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It was built more than sixty years ago from ironwood.",
        },
        {
          correct: false,
          label: "A wooden ladder with seven steps leads up to a wide veranda.",
        },
        {
          correct: false,
          label: "The roof is steep and covered with palm fiber.",
        },
        { correct: false, label: "Inside, there are only two rooms." },
        {
          correct: true,
          label:
            "None feels as calm as my grandmother's house when the rain is falling and the river is singing underneath.",
        },
      ],
    },
  },
};

export default item;
