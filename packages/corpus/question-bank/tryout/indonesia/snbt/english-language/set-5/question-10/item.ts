import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Evidence-informed change in a community food pantry",
        },
        {
          isCorrect: false,
          label: "stock rotation as the main measure in a service trial",
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
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
