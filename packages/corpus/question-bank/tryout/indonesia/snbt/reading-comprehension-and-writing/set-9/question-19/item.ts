import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "tooth-brushing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (6) membantah isi kalimat (5).",
        },
        {
          correct: false,
          label:
            "Kalimat (6) menyimpulkan bahwa kegiatan sikat gigi tidak berguna.",
        },
        {
          correct: false,
          label: "Kalimat (6) memberi contoh siswa kelas IV.",
        },
        {
          correct: false,
          label: "Kalimat (6) mengulang isi kalimat (5) dengan kata lain.",
        },
        {
          correct: true,
          label:
            "Kalimat (6) menjelaskan penyebab peristiwa dalam kalimat (5).",
        },
      ],
    },
  },
};

export default item;
