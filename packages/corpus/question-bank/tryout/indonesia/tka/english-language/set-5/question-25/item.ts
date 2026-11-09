import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "reader-response",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "“I disagree, because the log shows that students rarely use the library.”",
        },
        {
          correct: false,
          label:
            "“I agree completely, because the survey proves that every student needs a quiet place to study.”",
        },
        {
          correct: false,
          label:
            "“The idea is pointless, because the writer admits that the log counts some students twice.”",
        },
        {
          correct: true,
          label:
            "“The plan sounds reasonable, and counting visits after a trial semester would show whether the longer hours are really used.”",
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
