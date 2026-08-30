import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Menggiling biji-bijian yang diperlukan untuk membuat roti",
        },
        { isCorrect: false, label: "Menjaga pintu masuk rumah dari pencuri" },
        { isCorrect: false, label: "Membawa hasil panen dari luar kota" },
        {
          isCorrect: false,
          label: "Menghias bagian hunian dengan lukisan dinding",
        },
        {
          isCorrect: false,
          label: "Menjual roti langsung kepada pembeli di jalan",
        },
      ],
    },
  },
};

export default item;
