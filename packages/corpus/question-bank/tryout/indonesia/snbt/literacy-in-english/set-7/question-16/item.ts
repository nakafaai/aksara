import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "umbrella-stand",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Her father called the lending a leak, and she gave the umbrellas out again when she came home.",
        },
        {
          correct: false,
          label:
            "People came to the door to ask how she was, and there were nineteen umbrellas in the stand.",
        },
        {
          correct: false,
          label:
            "She bought cheap umbrellas at the market every few months, and hardly any came back.",
        },
        {
          correct: false,
          label:
            'One note said "Sorry it took so long", and she never bought another umbrella.',
        },
        {
          correct: true,
          label:
            "People came to the door to ask how she was, and she gave the umbrellas out to them again, one by one.",
        },
      ],
    },
  },
};

export default item;
