import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "antikythera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "They modelled how the Moon's speed changes, not just its average position.",
        },
        {
          correct: false,
          label:
            "They believed the Moon moved at exactly the same speed at all times.",
        },
        {
          correct: false,
          label:
            "They used the gears mainly to decorate the outside of the box.",
        },
        {
          correct: false,
          label: "They copied the design from medieval astronomical clocks.",
        },
        {
          correct: false,
          label:
            "They could not predict where the Moon would appear in the sky.",
        },
      ],
    },
  },
};

export default item;
