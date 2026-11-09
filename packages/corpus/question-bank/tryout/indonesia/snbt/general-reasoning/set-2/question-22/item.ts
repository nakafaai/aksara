import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "number-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Baris ke-$$13$$, urutan ke-$$9$$",
        },
        {
          correct: false,
          label: "Baris ke-$$14$$, urutan ke-$$5$$",
        },
        {
          correct: false,
          label: "Baris ke-$$14$$, urutan ke-$$10$$",
        },
        {
          correct: false,
          label: "Baris ke-$$10$$, urutan ke-$$10$$",
        },
        {
          correct: true,
          label: "Baris ke-$$14$$, urutan ke-$$9$$",
        },
      ],
    },
  },
};

export default item;
