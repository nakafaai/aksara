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
          label: "M is lithium, and the solution has pH $$12.3$$",
        },
        {
          correct: true,
          label: "M is sodium, and the solution has pH $$12.6$$",
        },
        {
          correct: false,
          label: "M is sodium, and the solution has pH $$1.4$$",
        },
        {
          correct: false,
          label: "M is potassium, and the solution has pH $$12.6$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "M ialah litium, dan larutan itu mempunyai pH $$12.3$$",
        },
        {
          correct: true,
          label: "M ialah natrium, dan larutan itu mempunyai pH $$12.6$$",
        },
        {
          correct: false,
          label: "M ialah natrium, dan larutan itu mempunyai pH $$1.4$$",
        },
        {
          correct: false,
          label: "M ialah kalium, dan larutan itu mempunyai pH $$12.6$$",
        },
      ],
    },
  },
};

export default item;
