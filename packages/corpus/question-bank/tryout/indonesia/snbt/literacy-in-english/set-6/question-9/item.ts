import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "grading-curve",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Students in curved courses reported feeling more stressed before exams.",
        },
        {
          correct: false,
          label:
            "Teachers who use curves spend less time marking than other teachers.",
        },
        {
          correct: false,
          label:
            "Employers rarely look at the grades of individual university courses.",
        },
        {
          correct: false,
          label:
            "Some students prefer curves because they learn their exact rank at once.",
        },
        {
          correct: true,
          label:
            "Students in curved courses formed study groups as often as students elsewhere.",
        },
      ],
    },
  },
};

export default item;
