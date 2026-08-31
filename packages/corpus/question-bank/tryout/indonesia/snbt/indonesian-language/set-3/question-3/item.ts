import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan 18, sedangkan nilai awal 11 dan pembanding 12, pencahayaan enam jam dengan jarak lampu yang tetap telah terisolasi sebagai satu-satunya penyebab selama jenis benih, volume air, dan ukuran wadah dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah jenis benih, volume air, dan ukuran wadah bersamaan dengan pencahayaan enam jam dengan jarak lampu yang tetap agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, pencahayaan enam jam dengan jarak lampu yang tetap berkaitan dengan perubahan dari 11 dan 12 menjadi 18; karena jumlah wadah sedikit dan pengamatan hanya berlangsung delapan hari, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa jumlah wadah sedikit dan pengamatan hanya berlangsung delapan hari memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang perkecambahan kacang hijau.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang perkecambahan kacang hijau.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
