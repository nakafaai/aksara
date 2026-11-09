import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "wrong-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A realistic story, because getting on a bus with a similar number is an everyday mistake.",
        },
        {
          correct: false,
          label:
            "A fantasy, because the bus drives into the rice fields by magic.",
        },
        {
          correct: false,
          label: "A legend, because it explains how Bus 7B got its name.",
        },
        {
          correct: false,
          label:
            "A fable, because the driver is an animal who teaches a lesson.",
        },
        {
          correct: false,
          label: "A fantasy, because a phone battery cannot run low.",
        },
      ],
    },
  },
};

export default item;
