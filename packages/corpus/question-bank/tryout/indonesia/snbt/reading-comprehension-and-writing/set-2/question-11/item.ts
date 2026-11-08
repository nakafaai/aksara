import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "medicine-delivery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "relawan mengambil obat, dokter menulis resep, relawan menjelaskan aturan minum obat",
        },
        {
          correct: false,
          label:
            "dokter memeriksa catatan, relawan menjelaskan aturan minum obat, relawan mengambil obat",
        },
        {
          correct: false,
          label:
            "relawan dilatih, relawan mengantarkan obat, dokter memeriksa catatan",
        },
        {
          correct: true,
          label:
            "dokter memeriksa catatan dan menulis resep, relawan mengambil obat, relawan menjelaskan aturan minum obat",
        },
        {
          correct: false,
          label:
            "relawan menjelaskan aturan minum obat, dokter menulis resep, relawan mengambil obat",
        },
      ],
    },
  },
};

export default item;
