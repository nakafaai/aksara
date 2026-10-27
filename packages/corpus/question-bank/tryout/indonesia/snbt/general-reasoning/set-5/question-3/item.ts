import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Stunting berarti berat badan rendah menurut tinggi badan",
        },
        {
          correct: false,
          label: "Stunting hanya dapat disebabkan oleh faktor genetik",
        },
        {
          correct: true,
          label:
            "Stunting adalah tinggi badan rendah menurut usia dan umumnya berkaitan dengan kekurangan gizi kronis atau berulang",
        },
        {
          correct: false,
          label: "Stunting selalu menyebabkan disabilitas kognitif",
        },
        {
          correct: false,
          label: "Kelebihan gizi adalah satu-satunya penyebab stunting",
        },
      ],
    },
  },
};

export default item;
