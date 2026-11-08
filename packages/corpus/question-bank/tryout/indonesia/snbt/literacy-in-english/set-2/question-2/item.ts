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
            "survive by going inactive until conditions improve, not by withstanding them.",
        },
        {
          correct: false,
          label:
            "move away from harsh conditions as soon as they detect a change in moisture.",
        },
        {
          correct: false,
          label:
            "become stronger the longer they are exposed to harsh conditions in the wild.",
        },
        {
          correct: false,
          label:
            "avoid harsh conditions by living only in deep lakes and oceans.",
        },
        {
          correct: false,
          label:
            "fight harsh conditions by producing large amounts of trehalose in their cells.",
        },
      ],
    },
  },
};

export default item;
