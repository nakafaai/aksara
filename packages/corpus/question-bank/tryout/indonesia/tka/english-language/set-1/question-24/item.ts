import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To argue that the reported outcomes already justify a permanent later start",
        },
        {
          correct: false,
          label:
            "To focus on transport objections instead of testing attendance and learning effects",
        },
        {
          correct: true,
          label:
            "To argue for a careful, measurable, and reversible schedule trial",
        },
        {
          correct: false,
          label: "To replace attendance records with one survey",
        },
        {
          correct: false,
          label:
            "To make extracurricular scheduling the main measure of the trial's success",
        },
      ],
    },
  },
  stimulus: "later-start",
};

export default item;
