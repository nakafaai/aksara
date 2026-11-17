import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$170\\text{ W}$$, $$87\\%$$ and $$27\\%$$" },
        { correct: true, label: "$$170\\text{ W}$$, $$69\\%$$ and $$9\\%$$" },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$100\\%$$ and $$40\\%$$",
        },
        { correct: false, label: "$$170\\text{ W}$$, $$69\\%$$ and $$64\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$170\\text{ W}$$, $$87\\%$$ dan $$27\\%$$" },
        { correct: true, label: "$$170\\text{ W}$$, $$69\\%$$ dan $$9\\%$$" },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$100\\%$$ dan $$40\\%$$",
        },
        { correct: false, label: "$$170\\text{ W}$$, $$69\\%$$ dan $$64\\%$$" },
      ],
    },
  },
};

export default item;
