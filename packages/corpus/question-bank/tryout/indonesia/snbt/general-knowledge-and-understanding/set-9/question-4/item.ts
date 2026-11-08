import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "tenun",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (9) membantah keterangan pada kalimat (8).",
        },
        {
          correct: false,
          label:
            "Kalimat (9) memberikan contoh motif yang dikerjakan berbulan-bulan.",
        },
        {
          correct: false,
          label:
            "Kalimat (9) menjelaskan penyebab rumitnya proses pembuatan kain.",
        },
        {
          correct: true,
          label:
            "Kalimat (9) menyebutkan akibat dari keterangan pada kalimat (8).",
        },
        {
          correct: false,
          label:
            "Kalimat (9) mengulang isi kalimat (8) dengan kata-kata yang berbeda.",
        },
      ],
    },
  },
};

export default item;
