import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "reservoir",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "From the boat, Grandmother named every one of the houses that the map was still missing.",
        },
        {
          correct: true,
          label:
            "The tree that bent the river road on the map was the same kind as the seed Grandmother planted.",
        },
        {
          correct: true,
          label:
            "The minaret that rose in August belonged to the mosque Laras first drew on the wrong side of the school.",
        },
        {
          correct: false,
          label:
            "The seed Grandmother planted had been in her keeping ever since the year the valley filled.",
        },
        {
          correct: false,
          label:
            "Laras moved the mosque to the east side of the school only after seeing the minaret from the boat.",
        },
      ],
    },
  },
};

export default item;
