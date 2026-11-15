import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "application",
  },
  stimulus: "umbrella-stand",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A neighbour who lends tools without keeping a list, and finds that the visits from people bringing them back matter more to her than the tools.",
        },
        {
          correct: false,
          label:
            "A neighbour who lends tools without keeping a list, and puts up a notice asking for them back once too many go missing.",
        },
        {
          correct: false,
          label:
            "A neighbour who lends tools without keeping a list, and is finally repaid when everyone returns them at once.",
        },
        {
          correct: false,
          label:
            "A neighbour who lends tools without keeping a list, so that she never has to admit how many she has lost.",
        },
        {
          correct: false,
          label:
            "A neighbour who lends tools without keeping a list, and decides to stop when too few come back.",
        },
      ],
    },
  },
};

export default item;
