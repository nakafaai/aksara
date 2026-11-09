import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "idiom",
  },
  stimulus: "tabungan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rasa lelah sesudah bekerja seharian",
        },
        {
          correct: false,
          label: "Upah tetap yang diterima setiap bulan",
        },
        {
          correct: false,
          label: "Keluhan warga kepada pengurus",
        },
        {
          correct: false,
          label: "Pekerjaan ringan yang tidak memerlukan tenaga",
        },
        {
          correct: true,
          label: "Usaha keras yang telah dilakukan",
        },
      ],
    },
  },
};

export default item;
