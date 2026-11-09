import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Angka gabungan naik terutama karena jumlah peserta pada kondisi papan baru lebih besar daripada pada kondisi papan lama.",
        },
        {
          correct: false,
          label:
            "Kenaikan angka gabungan menunjukkan setiap peserta memperoleh manfaat yang sama, meskipun hasil per kelompok berbeda.",
        },
        {
          correct: true,
          label:
            "Kenaikan gabungan terutama mencerminkan perbaikan pada kelompok berpenglihatan rendah. Kelompok berpenglihatan biasa bertahan di sekitar $$84$$ persen.",
        },
        {
          correct: false,
          label:
            "Angka $$52$$ dari $$65$$ lebih rendah daripada $$46$$ dari $$70$$ karena jumlah seluruh pesertanya lebih sedikit.",
        },
        {
          correct: false,
          label:
            "Perbandingan kelompok tidak dapat dilakukan karena pembilang dan penyebut pada dua kondisi tidak sama persis.",
        },
      ],
    },
  },
};

export default item;
