import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "bayu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (7) membantah keterangan pada kalimat (5) dan (6).",
        },
        {
          correct: false,
          label:
            "Kalimat (7) memberikan contoh pembangkit tenaga bayu di Sulawesi Selatan.",
        },
        {
          correct: false,
          label:
            "Kalimat (7) menjelaskan cara turbin mengubah putaran menjadi listrik.",
        },
        {
          correct: true,
          label:
            "Kalimat (7) menyimpulkan akibat dari keterangan pada kalimat (5) dan (6).",
        },
        {
          correct: false,
          label:
            "Kalimat (7) mengulang isi kalimat (4) dengan kata-kata yang berbeda.",
        },
      ],
    },
  },
};

export default item;
