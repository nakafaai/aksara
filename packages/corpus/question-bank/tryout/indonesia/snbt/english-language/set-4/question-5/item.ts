import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Measuring solute in one preliminary comparison",
        },
        {
          isCorrect: false,
          label:
            "Treating solute as the sole explanation for the observed result",
        },
        {
          isCorrect: false,
          label: "A final rule derived from the first comparison of solute",
        },
        {
          isCorrect: false,
          label: "A limitation that makes another test of solute unnecessary",
        },
        {
          isCorrect: true,
          label: "Testing how dissolved salt changes freezing point",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
