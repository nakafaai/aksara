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
          correct: false,
          label: "$$\\text{C}_3\\text{H}_8$$, $$16.0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$, $$16.0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_5\\text{OH}$$, $$9.6\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$, $$14.4\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_8$$, $$16.0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$, $$16.0\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_5\\text{OH}$$, $$9.6\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_3\\text{H}_7\\text{OH}$$, $$14.4\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
