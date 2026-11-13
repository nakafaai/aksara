import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
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
            "Dividing each quarter's cancellations by its starting subscribers gives churn rates of $$5\\%$$, $$5\\%$$, $$12.5\\%$$ and $$10\\%$$.",
        },
        {
          column: 1,
          label:
            "The table can only approximate the analyst's churn rate, because its cancellations may include people who signed up during the same quarter.",
        },
        {
          column: 2,
          label:
            "The analyst's figures show that churn more than doubled because of the price rise.",
        },
        {
          column: 2,
          label:
            'The table confirms the company\'s account of the extra cancellations as "healthy sorting".',
        },
      ],
    },
  },
};

export default item;
