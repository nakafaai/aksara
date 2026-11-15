import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "cycling-safety",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Most of the cycling in Riverton happens on its separated bike lanes.",
        },
        {
          correct: false,
          label:
            "Riverton has more residents than Eastvale, so it should be expected to record more injuries.",
        },
        {
          correct: true,
          label:
            "Riverton records only cycling injuries treated in hospital, while Eastvale also records injuries treated by family doctors.",
        },
        {
          correct: false,
          label:
            "Riverton's cyclists ride four times as far as Eastvale's, so they spend more time at risk.",
        },
        {
          correct: false,
          label:
            "Eastvale's residents own fewer bicycles than Riverton's residents.",
        },
      ],
    },
  },
};

export default item;
