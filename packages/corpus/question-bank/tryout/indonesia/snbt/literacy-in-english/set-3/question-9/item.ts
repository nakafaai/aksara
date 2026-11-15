import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "bag-charge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "It would be about $$80$$ tonnes, much less than the figure implied in Text B.",
        },
        {
          correct: false,
          label:
            "It would be about $$260$$ tonnes, more than the figure implied in Text B.",
        },
        {
          correct: false,
          label:
            "It would still be about $$200$$ tonnes, because the other shops do not hand out carrier bags.",
        },
        {
          correct: false,
          label:
            "It would be about $$560$$ tonnes, because the extra bin liners must be added to the bags saved.",
        },
        {
          correct: false,
          label:
            "It would be zero, because every carrier bag not handed out has been replaced by a bin liner.",
        },
      ],
    },
  },
};

export default item;
