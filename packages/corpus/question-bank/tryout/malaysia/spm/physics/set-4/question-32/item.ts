import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$67\\%$$, and $$1.25\\text{ A}$$ when stalled",
        },
        {
          correct: false,
          label: "$$33\\%$$, and $$3.75\\text{ A}$$ when stalled",
        },
        { correct: false, label: "$$67\\%$$, and no current when stalled" },
        {
          correct: true,
          label: "$$67\\%$$, and $$3.75\\text{ A}$$ when stalled",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$67\\%$$, dan $$1.25\\text{ A}$$ apabila tersekat",
        },
        {
          correct: false,
          label: "$$33\\%$$, dan $$3.75\\text{ A}$$ apabila tersekat",
        },
        { correct: false, label: "$$67\\%$$, dan tiada arus apabila tersekat" },
        {
          correct: true,
          label: "$$67\\%$$, dan $$3.75\\text{ A}$$ apabila tersekat",
        },
      ],
    },
  },
};

export default item;
