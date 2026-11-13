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
            "Grading weekend work is unfair because it rewards home conditions rather than learning.",
        },
        {
          correct: false,
          label:
            "Practice matters, and nobody on the planning committee disputes it.",
        },
        {
          correct: false,
          label: "Mathematics skills fade when they are used only once a week.",
        },
        {
          correct: false,
          label:
            "Students who work in a family shop should not be given any homework.",
        },
        {
          correct: false,
          label:
            "Weekend practice should be replaced by longer practice sessions on weekdays.",
        },
      ],
    },
  },
};

export default item;
