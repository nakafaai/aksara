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
            "The DNA-protecting protein also allows human cells to survive being dried out.",
        },
        {
          correct: false,
          label:
            "All tardigrade species produce the same DNA-protecting protein in their cells.",
        },
        {
          correct: true,
          label:
            "One protein supplies part of the tardigrade's radiation protection, even inside human cells.",
        },
        {
          correct: false,
          label:
            "X-rays cause no damage at all to human cells that contain the tardigrade gene.",
        },
      ],
    },
  },
};

export default item;
