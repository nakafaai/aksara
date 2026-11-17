import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$406\\text{ s}$$, and $$483\\text{ s}$$ on $$220\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$507\\text{ s}$$, and $$553\\text{ s}$$ on $$220\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$507\\text{ s}$$, and $$507\\text{ s}$$ on $$220\\text{ V}$$",
        },
        {
          correct: true,
          label:
            "$$507\\text{ s}$$, and $$604\\text{ s}$$ on $$220\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$406\\text{ s}$$, dan $$483\\text{ s}$$ pada $$220\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$507\\text{ s}$$, dan $$553\\text{ s}$$ pada $$220\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$507\\text{ s}$$, dan $$507\\text{ s}$$ pada $$220\\text{ V}$$",
        },
        {
          correct: true,
          label:
            "$$507\\text{ s}$$, dan $$604\\text{ s}$$ pada $$220\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
