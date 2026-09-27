import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Stunting berarti berat badan rendah menurut tinggi badan",
        },
        {
          isCorrect: false,
          label: "Stunting hanya dapat disebabkan oleh faktor genetik",
        },
        {
          isCorrect: true,
          label:
            "Stunting adalah tinggi badan rendah menurut usia dan umumnya berkaitan dengan kekurangan gizi kronis atau berulang",
        },
        {
          isCorrect: false,
          label: "Stunting selalu menyebabkan disabilitas kognitif",
        },
        {
          isCorrect: false,
          label: "Kelebihan gizi adalah satu-satunya penyebab stunting",
        },
      ],
    },
  },
};

export default item;
