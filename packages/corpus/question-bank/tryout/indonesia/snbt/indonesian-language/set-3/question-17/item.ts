import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Surat panitia dan foto sama-sama menempatkan kegiatan baca di ruang tunggu, tetapi yang satu merekam tujuan pendirian dan yang lain merekam pemakaian.",
        },
        {
          isCorrect: false,
          label:
            "Kedua sumber menunjukkan bahwa kegiatan baca pernah hadir di ruang tunggu; perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Karena membahas peristiwa yang sama, kedua sumber pasti mempunyai sudut pandang dan tujuan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Menggabungkan dua sumber memberi izin untuk mengisi bagian yang hilang dengan dugaan yang masuk akal.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan antarsumber hanya berkaitan dengan pilihan kata dan tidak memengaruhi simpulan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
