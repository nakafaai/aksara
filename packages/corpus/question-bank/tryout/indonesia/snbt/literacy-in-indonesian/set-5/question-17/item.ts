import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kedua sumber merekam perubahan kebutuhan reparasi dari waktu ke waktu. Perbedaan bentuk membuktikan bahwa salah satu sumber tidak dapat digunakan.",
        },
        {
          correct: false,
          label:
            "Karena membahas peristiwa yang sama, kedua sumber pasti mempunyai sudut pandang dan tujuan yang sama.",
        },
        {
          correct: true,
          label:
            "Buku pesanan menunjukkan pola jenis perbaikan lintas waktu, sedangkan wawancara memberi kemungkinan alasan. Keduanya saling melengkapi tanpa menjadi bukti yang setara.",
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
