import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "weekend",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Students who missed a weekend deadline had, on average, the same end-of-unit test scores as students who met it.",
        },
        {
          correct: false,
          label:
            "$$31\\%$$ of weekend assignments arrived late or incomplete, against $$12\\%$$ of weekday assignments.",
        },
        {
          correct: false,
          label:
            "Ms Hartono's remark that ten minutes a day keeps a skill from fading",
        },
        {
          correct: false,
          label:
            "Pak Darmawan's report that his son forgets half of a Sunday-night session by Wednesday",
        },
        {
          correct: false,
          label:
            "The plan to check an optional weekend task in class on Monday without a mark",
        },
      ],
    },
  },
};

export default item;
