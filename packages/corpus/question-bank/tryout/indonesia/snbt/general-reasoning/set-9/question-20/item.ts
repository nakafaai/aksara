import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "higrometer : kelembapan",
        },
        {
          correct: false,
          label: "suhu : termometer",
        },
        {
          correct: false,
          label: "jarak : odometer",
        },
        {
          correct: false,
          label: "timbangan : kecepatan",
        },
        {
          correct: false,
          label: "mikroskop : intensitas bunyi",
        },
      ],
    },
  },
};

export default item;
