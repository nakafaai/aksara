import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5.0\\text{ V}$$, and $$2.0\\text{ mA}$$" },
        {
          correct: true,
          label: "$$3.3\\text{ V}$$, and $$40\\ \\mu\\text{A}$$",
        },
        {
          correct: false,
          label: "$$3.3\\text{ V}$$, and $$20\\ \\mu\\text{A}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ V}$$, and $$40\\ \\mu\\text{A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5.0\\text{ V}$$, dan $$2.0\\text{ mA}$$" },
        {
          correct: true,
          label: "$$3.3\\text{ V}$$, dan $$40\\ \\mu\\text{A}$$",
        },
        {
          correct: false,
          label: "$$3.3\\text{ V}$$, dan $$20\\ \\mu\\text{A}$$",
        },
        {
          correct: false,
          label: "$$2.5\\text{ V}$$, dan $$40\\ \\mu\\text{A}$$",
        },
      ],
    },
  },
};

export default item;
