import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "tardigrade-survival",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Human cells are naturally better protected from X-rays than tardigrade cells are.",
        },
        {
          correct: false,
          label:
            "The DNA-protecting protein allows human cells to survive drying.",
        },
        {
          correct: false,
          label:
            "All tardigrade species produce the same DNA-protecting protein.",
        },
        {
          correct: true,
          label:
            "At least part of the tardigrade's protection against radiation comes from a single protein that can still work in another species' cells.",
        },
        {
          correct: false,
          label:
            "X-rays cause no damage to cells that contain the tardigrade gene.",
        },
      ],
    },
  },
};

export default item;
