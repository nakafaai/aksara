import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena langkah simulasi dapat diulang, batas 16 dan 24 dapat langsung dipakai untuk memperkirakan daya dukung semua populasi nyata.",
        },
        {
          isCorrect: true,
          label:
            "Perbedaan titik henti konsisten dengan gagasan daya dukung, tetapi karena batas itu dimasukkan melalui jumlah keping makanan, model tidak dapat menjadi bukti mandiri bahwa populasi nyata akan berhenti dengan pola yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Karena model menyederhanakan banyak proses biologis, perbedaan antara simulasi A dan B tidak dapat digunakan untuk menjelaskan hubungan sumber daya dan populasi.",
        },
        {
          isCorrect: false,
          label:
            "Titik henti yang berbeda membuktikan bahwa jumlah makanan selalu menjadi satu-satunya faktor yang menentukan daya dukung lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "Ketepatan model ditentukan oleh kesamaan jumlah putaran, sehingga faktor yang tidak dimuat tidak memengaruhi penerapan hasilnya di lapangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
