import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  stimulus: "gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "They would be twice as far apart, because the bottle would now be wider than before.",
        },
        {
          correct: false,
          label:
            "They would stay exactly where they are, because the funnel would still catch the same rain.",
        },
        {
          correct: true,
          label:
            "Each millimetre of rain would raise the water by one millimetre, so the marks would be half as far apart as before.",
        },
        {
          correct: false,
          label:
            "The zero line would no longer be needed, because a wider bottle would have no domed base.",
        },
        {
          correct: false,
          label:
            "Each $$8$$ mL poured in would now stand for $$2$$ mm of rain instead of $$1$$ mm.",
        },
      ],
    },
  },
};

export default item;
