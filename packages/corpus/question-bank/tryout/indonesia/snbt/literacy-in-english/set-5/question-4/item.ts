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
            "A doctor doubts a new drug because the first study used a faulty thermometer that greatly overstated how far the fever had dropped.",
        },
        {
          correct: false,
          label:
            "A doctor trusts a theory of how a new drug ought to work and keeps prescribing it even though trials show no effect on fever.",
        },
      ],
    },
  },
};

export default item;
