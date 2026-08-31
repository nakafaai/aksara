import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "To argue that the reported outcomes already justify a permanent later start",
        },
        {
          isCorrect: false,
          label:
            "To focus on transport objections instead of testing attendance and learning effects",
        },
        {
          isCorrect: true,
          label:
            "To argue for a careful, measurable, and reversible schedule trial",
        },
        {
          isCorrect: false,
          label: "To replace attendance records with one survey",
        },
        {
          isCorrect: false,
          label:
            "To make extracurricular scheduling the main measure of the trial's success",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
