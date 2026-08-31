import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kedua sumber memperlihatkan perkembangan kebiasaan membaca; perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Karena membahas peristiwa yang sama, kedua sumber pasti mempunyai sudut pandang dan tujuan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Daftar peminjaman dan catatan fasilitator sama-sama menelusuri kebiasaan membaca, tetapi pilihan buku dan kesulitan peserta berasal dari sudut pandang berbeda.",
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
