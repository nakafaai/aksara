import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$x=2$$, $$50.0\\%$$, $$200\\text{ cm}^3$$" },
        { correct: false, label: "$$x=1$$, $$100\\%$$, $$200\\text{ cm}^3$$" },
        { correct: false, label: "$$x=2$$, $$50.0\\%$$, $$100\\text{ cm}^3$$" },
        { correct: false, label: "$$x=2$$, $$50.0\\%$$, $$217\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$x=2$$, $$50.0\\%$$, $$200\\text{ cm}^3$$" },
        { correct: false, label: "$$x=1$$, $$100\\%$$, $$200\\text{ cm}^3$$" },
        { correct: false, label: "$$x=2$$, $$50.0\\%$$, $$100\\text{ cm}^3$$" },
        { correct: false, label: "$$x=2$$, $$50.0\\%$$, $$217\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
