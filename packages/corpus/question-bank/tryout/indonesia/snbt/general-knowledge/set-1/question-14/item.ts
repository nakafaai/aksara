import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sri Utami menjelaskan bahwa embun es terjadi setiap tahun.",
        },
        {
          isCorrect: true,
          label: "Setelah matahari terbit, suhu udara mencapai lima derajat.",
        },
        {
          isCorrect: false,
          label: "Kristal es bening menutupi rumput.",
        },
        {
          isCorrect: false,
          label: "Pengunjung yang datang lebih awal memotret embun es.",
        },
        {
          isCorrect: false,
          label: "Karena langit cerah, embun es terbentuk di atas rumput.",
        },
      ],
    },
  },
};

export default item;
