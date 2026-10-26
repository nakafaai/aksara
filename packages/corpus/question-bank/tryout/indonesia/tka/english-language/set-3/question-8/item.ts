import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To preserve the photograph and the visitor's memory as separate claims, while treating the visitor's approximate year as final.",
        },
        {
          correct: false,
          label:
            "To merge the photograph and the visitor's memory into one confident claim before either source could be checked.",
        },
        {
          correct: true,
          label:
            "To preserve which claim came from the photograph and which came from a person's memory, while leaving both open to later review.",
        },
        {
          correct: false,
          label:
            "To postpone recording both sources until every person and date in the photograph had been identified with certainty.",
        },
        {
          correct: false,
          label:
            "To preserve both claims for review, while giving the approximate memory greater weight than the dated photograph.",
        },
      ],
    },
  },
  stimulus: "archive-week",
};

export default item;
