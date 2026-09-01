import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Angka gabungan naik terutama karena jumlah peserta pada kondisi papan baru lebih besar daripada pada kondisi papan lama.",
        },
        {
          isCorrect: false,
          label:
            "Kenaikan angka gabungan menunjukkan setiap peserta memperoleh manfaat yang sama, meskipun hasil per kelompok berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Kenaikan gabungan terutama mencerminkan perbaikan pada kelompok berpenglihatan rendah; kelompok berpenglihatan biasa bertahan di sekitar 84 persen.",
        },
        {
          isCorrect: false,
          label:
            "Angka 52 dari 65 lebih rendah daripada 46 dari 70 karena jumlah seluruh pesertanya lebih sedikit.",
        },
        {
          isCorrect: false,
          label:
            "Perbandingan kelompok tidak dapat dilakukan karena pembilang dan penyebut pada dua kondisi tidak sama persis.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
