import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "tone-attitude",
  },
  stimulus: "right-repair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "fully supportive, because the concerns prove that only manufacturers should repair devices.",
        },
        {
          correct: false,
          label:
            "dismissive, because the concerns are presented as excuses with no basis.",
        },
        {
          correct: false,
          label:
            "uncertain, because the author cannot decide whether repairs are safe.",
        },
        {
          correct: false,
          label:
            "indifferent, because the author does not discuss the concerns at all.",
        },
        {
          correct: true,
          label:
            "partly accepting, because the concerns are treated as real but not as a reason for blanket restrictions.",
        },
      ],
    },
  },
};

export default item;
