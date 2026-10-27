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
            "Suhu putaran ketiga membuktikan reflektor $$45$$ derajat menghasilkan suhu $$66$$ derajat Celsius pada semua tingkat iradiansi.",
        },
        {
          correct: false,
          label:
            "Kenaikan suhu antarputaran terutama menunjukkan bahwa pemutaran posisi oven membuat reflektor semakin efektif.",
        },
        {
          correct: true,
          label:
            "Reflektor $$45$$ derajat menghasilkan suhu tertinggi pada setiap putaran uji, tetapi sudut, bentuk oven, dan kondisi cuaca yang terbatas belum menetapkan sudut terbaik secara umum.",
        },
        {
          correct: false,
          label:
            "Data menunjukkan iradiansi menentukan suhu akhir sepenuhnya sehingga perbedaan sudut reflektor tidak perlu ditafsirkan.",
        },
        {
          correct: false,
          label:
            "Tujuan utama percobaan adalah membuktikan semua reflektor lebih baik daripada tanpa reflektor, bukan membandingkan sudutnya.",
        },
      ],
    },
  },
};

export default item;
