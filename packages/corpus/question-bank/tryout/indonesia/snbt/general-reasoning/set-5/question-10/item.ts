import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sebagian roti Pabrik X tidak mengandung karbohidrat maupun energi",
        },
        {
          isCorrect: false,
          label: "Semua roti Pabrik X menggunakan tepung terigu protein tinggi",
        },
        {
          isCorrect: false,
          label: "Sebagian roti berprotein tinggi tidak mengandung karbohidrat",
        },
        {
          isCorrect: true,
          label:
            "Sebagian roti Pabrik X menggunakan tepung terigu protein rendah",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada roti Pabrik X yang menggunakan tepung protein tinggi",
        },
      ],
    },
  },
};

export default item;
