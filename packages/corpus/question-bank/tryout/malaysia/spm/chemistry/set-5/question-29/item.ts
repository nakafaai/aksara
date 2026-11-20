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
          label: "$$x=2$$, P, Q and R, $$92.0\\ \\mu\\text{g}$$",
        },
        {
          correct: true,
          label: "$$x=4$$, Q and R, $$46.0\\ \\mu\\text{g}$$",
        },
        {
          correct: false,
          label: "$$x=4$$, none of them, $$23.0\\ \\mu\\text{g}$$",
        },
        {
          correct: false,
          label: "$$x=4$$, Q and R, $$60.0\\ \\mu\\text{g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=2$$, P, Q dan R, $$92.0\\ \\mu\\text{g}$$",
        },
        {
          correct: true,
          label: "$$x=4$$, Q dan R, $$46.0\\ \\mu\\text{g}$$",
        },
        {
          correct: false,
          label: "$$x=4$$, tiada seorang pun, $$23.0\\ \\mu\\text{g}$$",
        },
        {
          correct: false,
          label: "$$x=4$$, Q dan R, $$60.0\\ \\mu\\text{g}$$",
        },
      ],
    },
  },
};

export default item;
