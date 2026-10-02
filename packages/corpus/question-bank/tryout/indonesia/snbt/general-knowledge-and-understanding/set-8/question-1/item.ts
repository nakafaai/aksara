import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
        {
          isCorrect: false,
          label:
            "Dua sensor merekam kejadian pada selang waktu yang sama, bukan secara bergantian.",
        },
        {
          isCorrect: true,
          label:
            "Dua tren yang bergerak berlawanan ditempatkan berdampingan agar perbedaannya terlihat jelas.",
        },
        {
          isCorrect: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
      ],
    },
  },
};

export default item;
