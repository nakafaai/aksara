import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "homeschooling",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That homeschooled children have as many chances to make friends as children who attend school every day.",
        },
        {
          correct: false,
          label:
            "That the number of households teaching at home will keep growing in the years after the pandemic.",
        },
        {
          correct: false,
          label:
            "That parents know their own children's habits and gaps better than any trained teacher could, however experienced that teacher might be.",
        },
        {
          correct: false,
          label:
            "That tighter rules would lower the test scores of the children who are now taught at home.",
        },
        {
          correct: true,
          label:
            "That the scores in the studies she cites describe homeschooled students in general, not mainly the families who report them.",
        },
      ],
    },
  },
};

export default item;
