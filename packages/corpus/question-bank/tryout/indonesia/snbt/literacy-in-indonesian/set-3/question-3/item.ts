import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena kondisi perubahan menghasilkan $$18$$, sedangkan nilai awal $$11$$ dan pembanding $$12$$, pencahayaan enam jam dengan jarak lampu yang tetap telah terisolasi sebagai satu-satunya penyebab selama jenis benih, volume air, dan ukuran wadah dibuat sama.",
        },
        {
          correct: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah jenis benih, volume air, dan ukuran wadah bersamaan dengan pencahayaan enam jam dengan jarak lampu yang tetap agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          correct: true,
          label:
            "Pada kondisi yang diuji, pencahayaan enam jam dengan jarak lampu yang tetap menghasilkan rata-rata $$18$$ benih berkecambah per wadah, lebih tinggi daripada nilai awal $$11$$ dan pembanding $$12$$. Karena jumlah wadah sedikit dan pengamatan hanya berlangsung delapan hari, pola itu perlu diuji lagi sebelum diperluas menjadi klaim umum.",
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa jumlah wadah sedikit dan pengamatan hanya berlangsung delapan hari memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang perkecambahan kacang hijau.",
        },
        {
          correct: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang perkecambahan kacang hijau.",
        },
      ],
    },
  },
};

export default item;
