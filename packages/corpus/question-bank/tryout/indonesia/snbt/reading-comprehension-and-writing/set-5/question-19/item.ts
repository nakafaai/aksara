import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "seed-soak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kalimat (6) menyampaikan dugaan penyebab peristiwa dalam kalimat (5).",
        },
        {
          correct: false,
          label: "Kalimat (6) memberi contoh biji yang membusuk.",
        },
        {
          correct: false,
          label: "Kalimat (6) membantah isi kalimat (5).",
        },
        {
          correct: false,
          label: "Kalimat (6) menyimpulkan seluruh hasil percobaan.",
        },
        {
          correct: false,
          label: "Kalimat (6) mengulang isi kalimat (5) dengan kata lain.",
        },
      ],
    },
  },
};

export default item;
