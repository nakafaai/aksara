import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.8\\text{ m}$$, and it then slides back down",
        },
        {
          correct: true,
          label: "$$9.4\\text{ m}$$, and it then slides back down",
        },
        {
          correct: false,
          label: "$$9.4\\text{ m}$$, and it then stays at rest",
        },
        {
          correct: false,
          label: "$$12.6\\text{ m}$$, and it then slides back down",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$7.8\\text{ m}$$, dan ia kemudian menggelongsor turun semula",
        },
        {
          correct: true,
          label:
            "$$9.4\\text{ m}$$, dan ia kemudian menggelongsor turun semula",
        },
        {
          correct: false,
          label: "$$9.4\\text{ m}$$, dan ia kemudian kekal pegun",
        },
        {
          correct: false,
          label:
            "$$12.6\\text{ m}$$, dan ia kemudian menggelongsor turun semula",
        },
      ],
    },
  },
};

export default item;
