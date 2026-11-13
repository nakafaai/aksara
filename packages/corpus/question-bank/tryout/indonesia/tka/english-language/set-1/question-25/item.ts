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
            "Ms Hartono's remark that a skill used once a week fades between lessons",
        },
        {
          correct: false,
          label:
            "Pak Darmawan's warning that many students will not open a book until Monday",
        },
        {
          correct: false,
          label:
            "The example of a student who shares one phone with three siblings",
        },
      ],
    },
  },
};

export default item;
