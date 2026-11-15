import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "cycling-safety",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Eastvale $$6$$ and Riverton $$3$$, so a Riverton resident was half as likely to be injured as an Eastvale resident.",
        },
        {
          correct: true,
          label:
            "Eastvale $$6$$ and Riverton $$3$$, so a kilometre cycled in Riverton carried half the risk of one in Eastvale.",
        },
        {
          correct: false,
          label:
            "Eastvale $$3$$ and Riverton $$4$$, so Eastvale was the safer place to cycle.",
        },
        {
          correct: false,
          label:
            "Eastvale $$6$$ and Riverton $$4$$, so a kilometre cycled in Riverton carried two-thirds of the risk of one in Eastvale.",
        },
        {
          correct: false,
          label:
            "Eastvale $$6$$ and Riverton $$3$$, so Riverton's bike lanes halved the risk of cycling.",
        },
      ],
    },
  },
};

export default item;
