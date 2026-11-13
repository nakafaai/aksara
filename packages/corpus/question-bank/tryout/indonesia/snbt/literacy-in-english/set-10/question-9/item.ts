import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "homeschooling",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Homeschooling has stayed far more common than it was before the pandemic.",
        },
        {
          column: 1,
          label: "Many homeschooled children reach a high level of achievement.",
        },
        {
          column: 2,
          label:
            "Test-score studies show that learning at home is what makes homeschooled students do well.",
        },
        {
          column: 1,
          label:
            "Some children who struggled at school do better once they are taught at home.",
        },
        {
          column: 2,
          label:
            "Parents without teacher training generally teach their own children less well than trained teachers would.",
        },
      ],
    },
  },
};

export default item;
