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
          label: "Kalimat (5) membantah data kelas III pada tabel.",
        },
        {
          correct: false,
          label:
            "Kalimat (5) menyimpulkan bahwa kegiatan sikat gigi tidak berguna.",
        },
        {
          correct: false,
          label: "Kalimat (5) memberi contoh siswa kelas IV.",
        },
        {
          correct: false,
          label:
            "Kalimat (5) menjelaskan penyebab besarnya penurunan di kelas IV.",
        },
        {
          correct: true,
          label:
            "Kalimat (5) menjelaskan penyebab kecilnya penurunan di kelas III.",
        },
      ],
    },
  },
};

export default item;
