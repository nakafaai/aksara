import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-relation",
  },
  stimulus: "batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (7) menjelaskan penyebab batik cap menjadi murah.",
        },
        {
          correct: false,
          label: "Kalimat (7) memberikan contoh lain keunggulan batik cap.",
        },
        {
          correct: false,
          label: "Kalimat (7) mengulang isi kalimat (6) dengan kata-kata lain.",
        },
        {
          correct: true,
          label:
            "Kalimat (7) menyampaikan kekurangan batik cap setelah kalimat (6) menyebut kelebihannya.",
        },
        {
          correct: false,
          label: "Kalimat (7) menyimpulkan seluruh isi paragraf pertama.",
        },
      ],
    },
  },
};

export default item;
