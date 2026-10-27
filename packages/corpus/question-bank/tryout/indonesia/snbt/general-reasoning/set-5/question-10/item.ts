import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian roti Pabrik X tidak mengandung karbohidrat maupun energi",
        },
        {
          correct: false,
          label: "Semua roti Pabrik X menggunakan tepung terigu protein tinggi",
        },
        {
          correct: false,
          label: "Sebagian roti berprotein tinggi tidak mengandung karbohidrat",
        },
        {
          correct: true,
          label:
            "Sebagian roti Pabrik X menggunakan tepung terigu protein rendah",
        },
        {
          correct: false,
          label:
            "Tidak ada roti Pabrik X yang menggunakan tepung protein tinggi",
        },
      ],
    },
  },
};

export default item;
