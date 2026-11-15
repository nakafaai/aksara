import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "continental-drift",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A doctor will not prescribe a new drug until she understands how it works, although she agrees that its trial results look promising.",
        },
        {
          correct: true,
          label:
            "A doctor sees a new drug lower fever in trial after trial but, since no one can say how it acts, decides the patients' improvement must be an illusion.",
        },
        {
          correct: false,
          label:
            "A doctor puts a patient's recovery down to a natural defence that no test has ever detected, and so decides that the new drug, whatever the trials say, played no part in it.",
        },
        {
          correct: false,
          label:
            "A doctor sees a new drug lower fever in trial after trial and, although no one can say how it acts, keeps prescribing it while asking researchers to find out.",
        },
        {
          correct: false,
          label:
            "A doctor sees a new drug lower fever in only one small trial and, since no one can say how it acts, waits for more trials before deciding.",
        },
      ],
    },
  },
};

export default item;
