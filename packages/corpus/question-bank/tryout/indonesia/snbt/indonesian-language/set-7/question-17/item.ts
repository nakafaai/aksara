import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kedua sumber merekam hubungan pameran dengan masyarakat; perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
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
        {
          isCorrect: true,
          label:
            "Poster dan buku tamu sama-sama menghubungkan pameran dengan masyarakat, tetapi pesan penyelenggara tidak sama dengan tanggapan sebagian pengunjung.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
