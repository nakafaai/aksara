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
            "Karena tali $$60$$ sentimeter menghasilkan $$15{,}6$$ detik dan kedua pengukuran tali $$100$$ sentimeter sekitar $$20$$ detik, data telah menentukan rumus periode untuk setiap panjang tali.",
        },
        {
          correct: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah massa, sudut awal, cara pelepasan, dan panjang tali secara bersamaan agar keadaan yang lebih beragam langsung terwakili.",
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa pengukuran manual masih dapat dipengaruhi waktu reaksi pencatat memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang periode ayunan bandul.",
        },
        {
          correct: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang periode ayunan bandul.",
        },
        {
          correct: true,
          label:
            "Kemiripan dua hasil tali $$100$$ sentimeter dan waktu yang lebih singkat pada tali $$60$$ sentimeter mendukung hubungan panjang dengan periode, tetapi pengujian panjang tambahan dan pencatat otomatis dapat membantu memeriksa bentuk hubungan serta ketidakpastian pengukurannya.",
        },
      ],
    },
  },
};

export default item;
