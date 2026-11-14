import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "first-aid",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "to explain how the school's youth health club was started",
        },
        {
          correct: false,
          label:
            "to give step-by-step instructions for treating a burn at home",
        },
        {
          correct: false,
          label: "to report one class's quiz results to the parents",
        },
        {
          correct: true,
          label:
            "to persuade the school to give every Grade 10 student a basic first-aid course",
        },
        {
          correct: false,
          label:
            "to argue that students can take the place of teachers on school trips",
        },
      ],
    },
  },
};

export default item;
