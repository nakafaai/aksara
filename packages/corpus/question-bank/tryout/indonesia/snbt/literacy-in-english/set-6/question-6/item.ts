import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "test-optional",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Students admitted without scores averaged $$2.9$$ against $$3.1$$, and the university now admits more students from low-income families.",
        },
        {
          correct: false,
          label:
            "Research favours reading scores against the results of an applicant's school, and coaching can also improve essays and activities.",
        },
        {
          correct: false,
          label:
            "Tests should stay optional for now, and the university should track how students do after their first year.",
        },
        {
          correct: true,
          label:
            "Students admitted without scores averaged $$2.9$$ against $$3.1$$, and both groups had already been chosen after the university weighed everything else it knew.",
        },
        {
          correct: false,
          label:
            "Students admitted without scores averaged $$2.9$$ against $$3.1$$, and coaching can also improve essays and activities.",
        },
      ],
    },
  },
};

export default item;
