import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "karang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (8) menyatakan akibat langsung dari keadaan pada kalimat (7).",
        },
        {
          correct: false,
          label:
            "Kalimat (8) memberikan contoh pemulihan warna pada kalimat (7).",
        },
        {
          correct: false,
          label: "Kalimat (8) mengulang isi kalimat (7) dengan kata-kata lain.",
        },
        {
          correct: true,
          label:
            "Kalimat (8) menyatakan kemungkinan buruk yang berlawanan dengan harapan pemulihan pada kalimat (7).",
        },
        {
          correct: false,
          label:
            "Kalimat (8) menyebutkan syarat yang harus dipenuhi agar pemulihan warna karang pada kalimat (7) dapat terjadi.",
        },
      ],
    },
  },
};

export default item;
