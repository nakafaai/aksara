import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kedua sumber merekam perubahan kebutuhan reparasi dari waktu ke waktu; perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Karena membahas peristiwa yang sama, kedua sumber pasti mempunyai sudut pandang dan tujuan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Buku pesanan dan cerita penjahit sama-sama menunjukkan perubahan reparasi, tetapi jenis perbaikan dan alasan pelanggan merupakan bukti yang berbeda.",
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
