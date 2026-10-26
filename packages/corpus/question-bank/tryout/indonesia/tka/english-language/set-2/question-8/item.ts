import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "accessible-fair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The pale lettering on the original signs would have become darker by itself during rain.",
        },
        {
          correct: false,
          label:
            "The robotics symbols could be understood before a parent finished reading.",
        },
        {
          correct: true,
          label:
            "The alternative entrance had a step, while its portable ramp was stored in a locked room.",
        },
        {
          correct: false,
          label:
            "The moved displays made the original doorway wider than the alternative entrance.",
        },
        {
          correct: false,
          label:
            "The fair would necessarily start early because fewer visitors would use the nearest entrance.",
        },
      ],
    },
  },
};

export default item;
