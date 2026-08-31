import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "wayfinding as the main measure in a service trial",
        },
        {
          isCorrect: false,
          label: "From a short comparison to a permanent service change",
        },
        {
          isCorrect: false,
          label: "Consultation without comparable outcome measures",
        },
        {
          isCorrect: false,
          label: "A local service trial with no follow-up decision",
        },
        {
          isCorrect: true,
          label:
            "Evidence-informed change in a neighbourhood bus information board",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
