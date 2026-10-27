import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
        {
          correct: false,
          label:
            "Dua sensor merekam kejadian pada selang waktu yang sama, bukan secara bergantian.",
        },
        {
          correct: true,
          label:
            "Dua tren yang bergerak berlawanan ditempatkan berdampingan agar perbedaannya terlihat jelas.",
        },
        {
          correct: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          correct: false,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
      ],
    },
  },
};

export default item;
