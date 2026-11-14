import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "kenikir",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menutup kemungkinan bahwa selisih kutu daun antarbedeng disebabkan oleh perbedaan perawatan",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa kepik lebih banyak mendatangi bedeng yang dikelilingi kenikir",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa siswa tetap rajin merawat kebun meskipun pestisida tidak lagi dipakai",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa penyiraman dan pemupukan tidak memengaruhi jumlah kutu daun",
        },
        {
          correct: false,
          label:
            "mengakui kelemahan pengamatan yang membuat Bu Laras perlu mengulangnya pada musim kemarau",
        },
      ],
    },
  },
};

export default item;
