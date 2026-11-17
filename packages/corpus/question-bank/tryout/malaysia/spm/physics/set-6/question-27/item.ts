import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15\\text{ m}$$, and $$67\\%$$" },
        { correct: false, label: "$$10\\text{ m}$$, and $$25\\%$$" },
        { correct: false, label: "$$10\\text{ m}$$, and $$50\\%$$" },
        { correct: true, label: "$$10\\text{ m}$$, and $$75\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$15\\text{ m}$$, dan $$67\\%$$" },
        { correct: false, label: "$$10\\text{ m}$$, dan $$25\\%$$" },
        { correct: false, label: "$$10\\text{ m}$$, dan $$50\\%$$" },
        { correct: true, label: "$$10\\text{ m}$$, dan $$75\\%$$" },
      ],
    },
  },
};

export default item;
