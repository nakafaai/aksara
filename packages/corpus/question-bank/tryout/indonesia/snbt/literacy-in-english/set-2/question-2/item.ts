import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "word-meaning",
  },
  stimulus: "tardigrade-survival",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "survive by becoming inactive until conditions improve rather than by withstanding the conditions while active.",
        },
        {
          correct: false,
          label: "move away from harsh conditions as soon as they detect them.",
        },
        {
          correct: false,
          label:
            "become stronger the longer they are exposed to harsh conditions.",
        },
        {
          correct: false,
          label: "avoid harsh conditions by living only in water.",
        },
        {
          correct: false,
          label:
            "fight harsh conditions by producing large amounts of trehalose.",
        },
      ],
    },
  },
};

export default item;
