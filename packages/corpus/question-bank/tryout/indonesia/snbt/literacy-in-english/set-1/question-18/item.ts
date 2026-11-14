import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "longitude-clock",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It proves that the Board favoured astronomers over clockmakers, since an astronomer who backed lunar distances sat on it.",
        },
        {
          correct: false,
          label:
            "It was justified, because H4 had not reached the accuracy that the Act asked for.",
        },
        {
          correct: true,
          label:
            "It can be defended as a demand for proof that the method would work again and in other makers' hands.",
        },
        {
          correct: true,
          label:
            "Its demand for copies was linked to what a navy, rather than a single ship, would need.",
        },
        {
          correct: false,
          label:
            "Asking for a second trial was sensible, but asking for copies by other makers went further than was reasonable.",
        },
      ],
    },
  },
};

export default item;
