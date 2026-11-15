import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "mercury-gold",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sekitar $$0{,}14$$ miligram per kilogram, padahal data tim di hilir sekitar $$6$$ kali lipatnya.",
        },
        {
          correct: false,
          label:
            "Sekitar $$1{,}26$$ miligram per kilogram, padahal data tim di hilir lebih rendah dari itu.",
        },
        {
          correct: false,
          label:
            "Sekitar $$0{,}14$$ miligram per kilogram, padahal data tim di hilir sekitar $$2$$ kali lipatnya.",
        },
        {
          correct: false,
          label:
            "Sekitar $$0{,}30$$ miligram per kilogram, padahal data tim di hilir sekitar $$3$$ kali lipatnya.",
        },
        {
          correct: false,
          label:
            "Sekitar $$0{,}14$$ miligram per kilogram, padahal data tim di hilir sekitar $$9$$ kali lipatnya.",
        },
      ],
    },
  },
};

export default item;
