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
          label: "To prove that every school must start at the same hour",
        },
        {
          isCorrect: false,
          label: "To reject all changes to school transport",
        },
        {
          isCorrect: false,
          label: "To replace attendance records with one survey",
        },
        {
          isCorrect: true,
          label:
            "To argue for a careful, measurable, and reversible schedule trial",
        },
        {
          isCorrect: false,
          label: "To remove after-school activities from the timetable",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
