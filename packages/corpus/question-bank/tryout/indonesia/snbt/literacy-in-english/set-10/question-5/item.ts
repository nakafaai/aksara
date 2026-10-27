import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Potential difference in a classroom circuit",
        },
        {
          correct: false,
          label:
            "Why parallel cells always produce the greatest terminal voltage",
        },
        {
          correct: true,
          label: "How cell arrangement changed terminal voltage under one load",
        },
        {
          correct: false,
          label: "Proving that two cells in series double a circuit's power",
        },
        {
          correct: false,
          label: "A universal voltage law derived from one resistor value",
        },
      ],
    },
  },
};

export default item;
