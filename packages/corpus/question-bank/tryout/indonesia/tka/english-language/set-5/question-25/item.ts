import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "reader-response",
  },
  stimulus: "swim-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "“I disagree, because the course shows that most students cannot learn to swim.”",
        },
        {
          correct: false,
          label:
            "“I agree completely, because the survey proves that every student at the school is in danger.”",
        },
        {
          correct: false,
          label:
            "“The idea is pointless, because the writer admits that the volunteers may have been keener than others.”",
        },
        {
          correct: true,
          label:
            "“The plan seems worth trying, and recording how many students reach 25 meters would show whether it works for students who did not volunteer.”",
        },
        {
          correct: false,
          label:
            "“The writer should have asked for a longer lunch break instead.”",
        },
      ],
    },
  },
};

export default item;
