import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dalam setiap putaran yang memiliki iradiansi sama untuk semua oven, sudut $$45$$ derajat unggul $$2$$ derajat Celsius atas sudut $$60$$ derajat, tetapi sudut di antara keduanya belum diuji.",
        },
        {
          correct: false,
          label:
            "Sudut $$45$$ derajat selalu menghasilkan kenaikan $$13$$ derajat Celsius dibandingkan oven tanpa reflektor pada ketiga putaran.",
        },
        {
          correct: false,
          label:
            "Sudut $$60$$ derajat lebih efektif pada iradiansi tinggi karena suhu akhirnya $$64$$ derajat Celsius, lebih tinggi daripada hasil $$45$$ derajat pada putaran pertama.",
        },
        {
          correct: false,
          label:
            "Tanpa reflektor merupakan pembanding yang tidak sah karena suhu akhirnya berubah ketika iradiansi berubah.",
        },
        {
          correct: false,
          label:
            "Karena posisi oven sudah diputar, cuaca tidak lagi dapat memengaruhi perbandingan antarputaran.",
        },
      ],
    },
  },
};

export default item;
