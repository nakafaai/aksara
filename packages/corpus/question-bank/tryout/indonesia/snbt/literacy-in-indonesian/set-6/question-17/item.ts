import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kedua sumber membantu menelusuri perjalanan sebuah karya. Perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
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
        {
          correct: true,
          label:
            "Label pameran menyebut koleksi atau pemberi pinjaman bagi pengunjung, sedangkan kartu kondisi mencatat lokasi dan kerusakan untuk perawatan. Keduanya memberi bukti berbeda tentang perjalanan karya.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
