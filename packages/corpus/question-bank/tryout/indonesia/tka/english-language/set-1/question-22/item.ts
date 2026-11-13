import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "weekend",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Last semester, $$31\\%$$ of weekend assignments arrived late or incomplete.",
        },
        {
          correct: false,
          label:
            "\"I would rather he did a little each evening, but if nothing is due, he will not open a book until Monday.\"",
        },
        {
          correct: false,
          label:
            "Students who missed a weekend deadline had, on average, the same end-of-unit test scores as students who met it.",
        },
        {
          correct: true,
          label: "It is the only fair way to treat weekend learning.",
        },
        {
          correct: false,
          label: "\"A skill you use once a week fades between lessons.\"",
        },
      ],
    },
  },
};

export default item;
