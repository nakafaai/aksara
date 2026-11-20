import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$170\\text{ m}$$, through the rail after $$0.034\\text{ s}$$, and $$0.48\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$180\\text{ m}$$, through the rail after $$0.036\\text{ s}$$, and $$0.48\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$180\\text{ m}$$, through the air after $$0.54\\text{ s}$$, and $$0.48\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$180\\text{ m}$$, through the rail after $$0.036\\text{ s}$$, and $$0.52\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$170\\text{ m}$$, melalui rel selepas $$0.034\\text{ s}$$, dan $$0.48\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$180\\text{ m}$$, melalui rel selepas $$0.036\\text{ s}$$, dan $$0.48\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$180\\text{ m}$$, melalui udara selepas $$0.54\\text{ s}$$, dan $$0.48\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$180\\text{ m}$$, melalui rel selepas $$0.036\\text{ s}$$, dan $$0.52\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
