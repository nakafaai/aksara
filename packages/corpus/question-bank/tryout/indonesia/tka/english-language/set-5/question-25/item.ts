import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "reader-response",
  },
  stimulus: "phone-free-lunch",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "“I disagree, because the survey shows that phone-free lunches make students tired.”",
        },
        {
          correct: false,
          label:
            "“I agree completely, because the numbers prove that phones ruin friendships.”",
        },
        {
          correct: false,
          label:
            "“The idea is pointless, because the writer admits the data cannot prove anything.”",
        },
        {
          correct: true,
          label:
            "“The idea seems worth trying, and the school could test it for longer to see whether the difference lasts.”",
        },
        {
          correct: false,
          label:
            "“The writer should have asked for phones to be banned during lessons instead.”",
        },
      ],
    },
  },
};

export default item;
