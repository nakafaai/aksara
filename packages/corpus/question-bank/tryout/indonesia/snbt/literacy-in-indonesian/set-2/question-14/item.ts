import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Kamera jebak" },
        { correct: false, label: "Kompas" },
        { correct: false, label: "Radio genggam" },
        { correct: true, label: "GPS Collar" },
        {
          correct: false,
          label: "Penerima satelit",
        },
      ],
    },
  },
};

export default item;
