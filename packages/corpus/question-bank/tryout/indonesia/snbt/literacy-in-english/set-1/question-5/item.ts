import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "octopus-arms",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A soft robot with control spread along its body outperformed an identical robot with one central processor.",
        },
        {
          correct: false,
          label:
            "Octopuses learned to open jars faster than any other invertebrate tested in the same laboratory.",
        },
        {
          correct: false,
          label:
            "Prosthetic human arms with more joints were harder for users to control than simpler designs.",
        },
        {
          correct: false,
          label:
            "Severed octopus arms stopped responding to touch after about an hour, even when kept in seawater.",
        },
        {
          correct: false,
          label:
            "Robots with a single central processor were cheaper to build than robots with many controllers.",
        },
      ],
    },
  },
};

export default item;
