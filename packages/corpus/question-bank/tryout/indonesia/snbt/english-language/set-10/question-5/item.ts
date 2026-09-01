import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Potential difference in a classroom circuit",
        },
        {
          isCorrect: false,
          label:
            "Why parallel cells always produce the greatest terminal voltage",
        },
        {
          isCorrect: true,
          label: "How cell arrangement changed terminal voltage under one load",
        },
        {
          isCorrect: false,
          label: "Proving that two cells in series double a circuit's power",
        },
        {
          isCorrect: false,
          label: "A universal voltage law derived from one resistor value",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
