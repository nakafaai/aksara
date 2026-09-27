import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kartu pertanyaan membuat jumlah pengunjung yang bertanya tidak perlu diukur.",
        },
        {
          isCorrect: false,
          label:
            "Kartu pertanyaan memungkinkan banyak unsur tur diubah sekaligus.",
        },
        {
          isCorrect: true,
          label:
            "Dua pertanyaan awal pada kartu memberi pengunjung titik awal yang lebih khusus daripada undangan untuk bertanya apa saja.",
        },
        {
          isCorrect: false,
          label:
            "Kartu dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Kartu dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
