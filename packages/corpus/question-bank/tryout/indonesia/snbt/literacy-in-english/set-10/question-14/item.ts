import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "subscription-churn",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Cancellations among subscribers who had been paying since before July rose from about $$22{,}000$$ to about $$50{,}000$$.",
        },
        {
          column: 2,
          label:
            "About $$30{,}000$$ of the July to September cancellations came from trial accounts that had never paid.",
        },
        {
          column: 1,
          label:
            "Most of the trial users who cancelled had paid for at least one month before they left.",
        },
        {
          column: 2,
          label:
            "The churn rate fell back in October to December, once few new customers were on a trial.",
        },
        {
          column: 2,
          label:
            "Cancellations among subscribers who had been paying since before July rose from about $$22{,}000$$ to about $$25{,}000$$.",
        },
      ],
    },
  },
};

export default item;
