import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Karena langkah simulasi dapat diulang, batas $$16$$ dan $$24$$ dapat langsung dipakai untuk memperkirakan daya dukung semua populasi nyata.",
        },
        {
          correct: true,
          label:
            "Perbedaan titik henti konsisten dengan gagasan daya dukung, tetapi karena batas itu dimasukkan melalui jumlah keping makanan, model tidak dapat menjadi bukti mandiri bahwa populasi nyata akan berhenti dengan pola yang sama.",
        },
        {
          correct: false,
          label:
            "Karena model menyederhanakan banyak proses biologis, perbedaan antara simulasi A dan B tidak dapat digunakan untuk menjelaskan hubungan sumber daya dan populasi.",
        },
        {
          correct: false,
          label:
            "Titik henti yang berbeda membuktikan bahwa jumlah makanan selalu menjadi satu-satunya faktor yang menentukan daya dukung lingkungan.",
        },
        {
          correct: false,
          label:
            "Ketepatan model ditentukan oleh kesamaan jumlah putaran, sehingga faktor yang tidak dimuat tidak memengaruhi penerapan hasilnya di lapangan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
