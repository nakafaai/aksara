import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring solute concentration in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating the solute as the sole explanation for the observed result",
        },
        {
          isCorrect: false,
          label: "A final rule derived from the first solute trial",
        },
        {
          isCorrect: false,
          label: "A limitation that makes another solute trial unnecessary",
        },
        {
          isCorrect: true,
          label: "Testing dissolved salt and the temperature of ice formation",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
