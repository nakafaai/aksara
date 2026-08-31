import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Suhu putaran ketiga membuktikan reflektor 45 derajat menghasilkan suhu 66 derajat Celsius pada semua tingkat iradiansi.",
        },
        {
          isCorrect: false,
          label:
            "Kenaikan suhu antarputaran terutama menunjukkan bahwa pemutaran posisi oven membuat reflektor semakin efektif.",
        },
        {
          isCorrect: true,
          label:
            "Reflektor 45 derajat menghasilkan suhu tertinggi pada setiap putaran uji, tetapi sudut, bentuk oven, dan kondisi cuaca yang terbatas belum menetapkan sudut terbaik secara umum.",
        },
        {
          isCorrect: false,
          label:
            "Data menunjukkan iradiansi menentukan suhu akhir sepenuhnya sehingga perbedaan sudut reflektor tidak perlu ditafsirkan.",
        },
        {
          isCorrect: false,
          label:
            "Tujuan utama percobaan adalah membuktikan semua reflektor lebih baik daripada tanpa reflektor, bukan membandingkan sudutnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
