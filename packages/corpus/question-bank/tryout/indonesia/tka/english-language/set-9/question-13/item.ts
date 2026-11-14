import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "substitute-teacher",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "sit at the back again and never speak" },
        { correct: false, label: "refuse to read the geography chapter" },
        {
          correct: true,
          label:
            "take part more actively, especially in activities that draw on real-life experience",
        },
        { correct: false, label: "ask to move to a different class" },
        {
          correct: false,
          label: "take the wrong angkot on purpose to find more shortcuts",
        },
      ],
    },
  },
};

export default item;
