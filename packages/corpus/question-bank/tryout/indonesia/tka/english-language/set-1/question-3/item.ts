import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "reservoir",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "She answers in steps rather than metres, and later she points east when Laras draws the mosque west of the school.",
        },
        {
          correct: true,
          label:
            "She turns up the radio when the map is first mentioned, and later she asks for the pencil and draws the tamarind herself.",
        },
        {
          correct: false,
          label:
            "She laughs and then cries when the heron speaks, and later she plants the tamarind seed she has carried since 1987.",
        },
        {
          correct: false,
          label:
            "She says there is nothing to map because it is all water, and later she can name a house only from the spot where it stood.",
        },
        {
          correct: false,
          label:
            "She turns up the radio when the map is first mentioned, and she joins in only after the heron calls her by her childhood name.",
        },
      ],
    },
  },
};

export default item;
