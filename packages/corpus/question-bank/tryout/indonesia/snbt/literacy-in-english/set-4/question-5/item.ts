import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Measuring solute concentration in one preliminary comparison",
        },
        {
          correct: false,
          label:
            "Treating the solute as the sole explanation for the observed result",
        },
        {
          correct: false,
          label: "A final rule derived from the first solute trial",
        },
        {
          correct: false,
          label: "A limitation that makes another solute trial unnecessary",
        },
        {
          correct: true,
          label: "Testing dissolved salt and the temperature of ice formation",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
