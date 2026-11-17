import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x=5$$, $$x=5$$" },
        { correct: true, label: "$$x=5.8$$, $$x=5$$" },
        { correct: false, label: "$$x=5.8$$, $$x=5.5$$" },
        { correct: false, label: "$$x=5.3$$, $$x=5$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$x=5$$, $$x=5$$" },
        { correct: true, label: "$$x=5.8$$, $$x=5$$" },
        { correct: false, label: "$$x=5.8$$, $$x=5.5$$" },
        { correct: false, label: "$$x=5.3$$, $$x=5$$" },
      ],
    },
  },
};

export default item;
