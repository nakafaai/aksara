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
            "A soft robot with controllers spread along its body completed grasping tasks faster, and with less computing power, than an identical robot run by one central processor.",
        },
        {
          correct: false,
          label:
            "Octopuses learned to open jars faster than any other invertebrate tested.",
        },
        {
          correct: false,
          label:
            "Prosthetic human arms with more joints were harder for users to control.",
        },
        {
          correct: false,
          label:
            "Severed octopus arms stopped responding to touch after about an hour.",
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
