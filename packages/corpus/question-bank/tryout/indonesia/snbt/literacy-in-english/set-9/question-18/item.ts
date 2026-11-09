import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "braille-code",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "A whole symbol could be felt at once under one fingertip.",
        },
        {
          correct: false,
          label: "Six dots were cheaper to print than twelve dots on paper.",
        },
        {
          correct: false,
          label:
            "Sighted teachers could read six dots more easily than letters.",
        },
        {
          correct: false,
          label:
            "Six dots allowed the system to represent sounds instead of spelling.",
        },
        {
          correct: false,
          label: "Barbier had asked Braille to use fewer dots for the army.",
        },
      ],
    },
  },
};

export default item;
