import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "beach-cleanup",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Volunteers weigh 87 kilograms of waste collected from a beach.",
        },
        {
          correct: false,
          label: "Tourists are blamed for leaving rubbish at Pantai Kuta Baru.",
        },
        {
          correct: true,
          label:
            "A scout troop joins a beach cleanup, records what it finds, and learns that much of the waste may come from upstream.",
        },
        {
          correct: false,
          label:
            "A university team explains how beaches can reduce plastic waste.",
        },
        {
          correct: false,
          label:
            "A scout troop learns how to untangle a fishing net from driftwood.",
        },
      ],
    },
  },
};

export default item;
