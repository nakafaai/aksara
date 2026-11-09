import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "octopus-arms",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "showing that octopuses have more neurons than any other invertebrate.",
        },
        {
          correct: true,
          label:
            "explaining how an octopus shares control of movement between brain and arms.",
        },
        {
          correct: false,
          label:
            "arguing that octopus arms can survive and act as independent animals.",
        },
        {
          correct: false,
          label:
            "describing laboratory methods for separating an octopus arm from its body.",
        },
        {
          correct: false,
          label:
            "proposing that engineers should build robots shaped like octopuses.",
        },
      ],
    },
  },
};

export default item;
