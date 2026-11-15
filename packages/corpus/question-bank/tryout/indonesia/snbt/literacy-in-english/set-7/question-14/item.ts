import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "cycling-safety",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "On average, each Riverton resident cycled more kilometres than each Eastvale resident.",
        },
        {
          correct: true,
          label:
            "Measured per resident, Eastvale had fewer injuries, but not half as many.",
        },
        {
          correct: true,
          label:
            "Eastvale's cyclists rode a quarter as far as Riverton's in total and had half as many injuries.",
        },
        {
          correct: false,
          label:
            "If Eastvale's cyclists had ridden $$40$$ million kilometres at their own rate, they would have had about $$120$$ injuries.",
        },
        {
          correct: false,
          label:
            "The table shows that the bike lanes encouraged more people in Riverton to cycle.",
        },
      ],
    },
  },
};

export default item;
