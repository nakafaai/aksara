import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "wrong-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "careless, because she loses the card her mother wrote",
        },
        {
          correct: false,
          label: "rude, because she argues with the bus driver",
        },
        {
          correct: false,
          label: "lazy, because she refuses to walk to the bakery",
        },
        {
          correct: false,
          label: "fearless, because she never feels worried at all",
        },
        {
          correct: true,
          label:
            "resourceful, because she asks for help and finds her own way back",
        },
      ],
    },
  },
};

export default item;
