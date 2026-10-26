import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sensor mengalami gangguan.",
        },
        {
          correct: true,
          label: "Pembersihan harian yang dijadwalkan tidak dilewatkan.",
        },
        {
          correct: false,
          label: "Lampu peringatan menyala.",
        },
        {
          correct: false,
          label: "Residu tertinggal pada sensor.",
        },
        {
          correct: false,
          label: "Pembersihan harian yang dijadwalkan dilewatkan.",
        },
      ],
    },
  },
};

export default item;
