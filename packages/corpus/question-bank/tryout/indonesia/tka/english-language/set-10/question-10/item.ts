import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "text-fit",
  },
  stimulus: "fun-run",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It seemed a sensible way to see at a glance who was on the track.",
        },
        {
          correct: false,
          label: "I made no mark until a runner had finished a full lap.",
        },
        {
          correct: true,
          label:
            "It did not cross my mind that setting off is not the same as finishing a lap.",
        },
        {
          correct: false,
          label:
            "Bu Sinta checked my sheet against her times that same afternoon.",
        },
        {
          correct: false,
          label: "All our runners ran the same number of laps.",
        },
      ],
    },
  },
};

export default item;
