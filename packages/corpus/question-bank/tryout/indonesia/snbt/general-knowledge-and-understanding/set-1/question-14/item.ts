import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sri Utami menjelaskan bahwa embun es terjadi setiap tahun.",
        },
        {
          correct: true,
          label: "Setelah matahari terbit, suhu udara mencapai lima derajat.",
        },
        {
          correct: false,
          label: "Kristal es bening menutupi rumput.",
        },
        {
          correct: false,
          label: "Pengunjung yang datang lebih awal memotret embun es.",
        },
        {
          correct: false,
          label: "Karena langit cerah, embun es terbentuk di atas rumput.",
        },
      ],
    },
  },
};

export default item;
