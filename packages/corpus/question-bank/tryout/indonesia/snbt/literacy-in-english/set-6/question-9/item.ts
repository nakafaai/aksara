import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "test-optional",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Among applicants from the same school and with similar family incomes, test scores still predicted first-year grades.",
        },
        {
          correct: false,
          label:
            "Applicants who sent in scores had, on average, attended better-funded schools than those who did not.",
        },
        {
          correct: false,
          label:
            "Test scores rose at schools that began to offer free coaching to all their students.",
        },
        {
          correct: false,
          label:
            "Students admitted without scores earned lower first-year grades than students admitted with scores.",
        },
        {
          correct: false,
          label:
            "Coaching can raise an applicant's essay as well as the applicant's test score.",
        },
      ],
    },
  },
};

export default item;
