import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kartu menunjukkan kadar air tinggi",
        },
        {
          correct: false,
          label: "Kartu menunjukkan karbohidrat rendah",
        },
        {
          correct: false,
          label: "Kartu menunjukkan kadar lemak rendah",
        },
        {
          correct: false,
          label: "Kartu tidak menunjukkan karbohidrat tinggi",
        },
        {
          correct: true,
          label: "Kartu menunjukkan kadar lemak tinggi",
        },
      ],
    },
  },
};

export default item;
