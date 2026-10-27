import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Surat panitia dan foto sama-sama menempatkan kegiatan baca di ruang tunggu, tetapi yang satu merekam tujuan pendirian dan yang lain merekam pemakaian.",
        },
        {
          correct: false,
          label:
            "Kedua sumber menunjukkan bahwa kegiatan baca pernah hadir di ruang tunggu. Perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
        },
        {
          correct: false,
          label:
            "Karena membahas peristiwa yang sama, kedua sumber pasti mempunyai sudut pandang dan tujuan yang sama.",
        },
        {
          correct: false,
          label:
            "Menggabungkan dua sumber memberi izin untuk mengisi bagian yang hilang dengan dugaan yang masuk akal.",
        },
        {
          correct: false,
          label:
            "Perbedaan antarsumber hanya berkaitan dengan pilihan kata dan tidak memengaruhi simpulan.",
        },
      ],
    },
  },
};

export default item;
