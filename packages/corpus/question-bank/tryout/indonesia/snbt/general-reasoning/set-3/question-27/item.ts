import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "average-speed",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$8{,}4$$ km/jam",
        },
        {
          correct: true,
          label: "$$16{,}8$$ km/jam",
        },
        {
          correct: false,
          label: "$$17{,}5$$ km/jam",
        },
        {
          correct: false,
          label: "$$21$$ km/jam",
        },
        {
          correct: false,
          label: "$$35$$ km/jam",
        },
      ],
    },
  },
};

export default item;
