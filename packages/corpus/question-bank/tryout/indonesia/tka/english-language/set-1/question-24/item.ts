import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "weekend",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Grading work done at home is unfair because the grade reflects home conditions as much as learning.",
        },
        {
          correct: false,
          label:
            "Practice matters, and nobody on the planning committee disputes it.",
        },
        {
          correct: false,
          label:
            "Short daily practice keeps a skill from fading between lessons.",
        },
        {
          correct: false,
          label:
            "Students who work in a family shop or share a phone should be excused from homework.",
        },
        {
          correct: false,
          label:
            "Tests should be taken at school, where conditions are the same for everyone.",
        },
      ],
    },
  },
};

export default item;
