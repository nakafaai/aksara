import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "summary",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The writer rejects the teachers' concern as unimportant.",
        },
        {
          correct: false,
          label: "The writer asks the school to hire three new librarians.",
        },
        {
          correct: true,
          label:
            "The writer accepts a concern about cost and suggests volunteers and a one-semester trial.",
        },
        {
          correct: false,
          label: "The writer reports new figures from the visitor log.",
        },
        {
          correct: false,
          label: "The writer explains how students can join the library club.",
        },
      ],
    },
  },
};

export default item;
