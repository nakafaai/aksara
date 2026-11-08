import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "braille-code",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To show that blind pupils in Paris did not want to learn to read",
        },
        {
          correct: false,
          label:
            "To argue that raised letters were better for sighted teachers",
        },
        {
          correct: true,
          label: "To show the problems that Braille's system would later solve",
        },
        {
          correct: false,
          label:
            "To explain how Braille injured his eye in his father's workshop",
        },
        {
          correct: false,
          label:
            "To prove that Barbier had invented raised-letter books for the army",
        },
      ],
    },
  },
};

export default item;
