import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "taman-siswa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menjelaskan alasan peraturan tahun 1932 akhirnya dicabut",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa Taman Siswa kini menjadi satu-satunya sekolah",
        },
        {
          correct: true,
          label: "menunjukkan bahwa jasa Ki Hadjar masih dihargai hingga kini",
        },
        {
          correct: false,
          label: "mengkritik pemerintah kolonial yang mencurigai Taman Siswa",
        },
        {
          correct: false,
          label: "memberi tahu tanggal berdirinya perguruan Taman Siswa",
        },
      ],
    },
  },
};

export default item;
