import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "sekolah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Siswanya tidur lebih awal pada malam sebelum hari sekolah.",
        },
        {
          correct: true,
          label:
            "Siswanya lebih jarang terlambat, sedangkan nilai ujiannya hampir tidak berubah.",
        },
        {
          correct: false,
          label:
            "Nilai ujian siswanya naik karena siswa tidur lebih lama pada malam sebelum hari sekolah.",
        },
        {
          correct: false,
          label: "Sebagian besar gurunya menolak perubahan jam masuk.",
        },
        {
          correct: false,
          label: "Kegiatan ekstrakurikulernya menjadi lebih sedikit.",
        },
      ],
    },
  },
};

export default item;
