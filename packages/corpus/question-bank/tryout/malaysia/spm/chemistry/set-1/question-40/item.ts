import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$ and $$7.2\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$ and $$5.4\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_5\\text{OH}$$ and $$5.4\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_9\\text{OH}$$ and $$9.0\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$ dan $$7.2\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$ dan $$5.4\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_5\\text{OH}$$ dan $$5.4\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_9\\text{OH}$$ dan $$9.0\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
