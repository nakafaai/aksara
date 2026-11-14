import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "wrong-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "refuse ever to take a bus alone again" },
        {
          correct: false,
          label: "read her book without looking up from the start of the trip",
        },
        {
          correct: false,
          label: "take the 7B on purpose to see the rice fields again",
        },
        {
          correct: true,
          label:
            "check the whole route sign, including any letter, before getting on",
        },
        {
          correct: false,
          label: "ask her aunt to drive her instead of taking the bus",
        },
      ],
    },
  },
};

export default item;
