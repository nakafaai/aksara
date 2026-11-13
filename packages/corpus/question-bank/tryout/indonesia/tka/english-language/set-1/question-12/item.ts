import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "broadcast",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The caretaker was careless, and the failed broadcast was his fault.",
        },
        {
          correct: false,
          label:
            "Rina would have noticed the silence at once if she had been paying attention.",
        },
        {
          correct: false,
          label:
            "The club should give up live broadcasts and play recordings instead.",
        },
        {
          correct: false,
          label:
            "The failure shows that the school's equipment was too old to be trusted.",
        },
        {
          correct: true,
          label:
            "The club had checked what it was sending but not what listeners received, and its new routine checks exactly that.",
        },
      ],
    },
  },
};

export default item;
