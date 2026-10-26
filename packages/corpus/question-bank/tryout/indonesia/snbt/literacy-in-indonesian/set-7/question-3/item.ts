import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena kondisi perubahan menghasilkan $$23$$, sedangkan hasil pada dua suhu lain $$14$$ dan $$4$$, air bersuhu $$35$$ derajat Celsius telah terisolasi sebagai satu-satunya penyebab selama massa ragi, jumlah gula, dan ukuran botol dibuat sama.",
        },
        {
          correct: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah massa ragi, jumlah gula, dan ukuran botol bersamaan dengan air bersuhu $$35$$ derajat Celsius agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa keliling balon hanya menjadi petunjuk kasar jumlah gas memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang produksi gas pada campuran ragi.",
        },
        {
          correct: true,
          label:
            "Dalam tiga suhu yang diuji, $$35^\\circ\\text{C}$$ menghasilkan keliling rata-rata terbesar, tetapi suhu tambahan dan pengukuran gas langsung diperlukan sebelum $$35^\\circ\\text{C}$$ disebut suhu optimum produksi gas.",
        },
        {
          correct: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang produksi gas pada campuran ragi.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
