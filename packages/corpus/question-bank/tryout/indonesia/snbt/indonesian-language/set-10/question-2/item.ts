import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dalam setiap putaran yang memiliki iradiansi sama untuk semua oven, sudut 45 derajat unggul 2 derajat Celsius atas sudut 60 derajat, tetapi sudut di antara keduanya belum diuji.",
        },
        {
          isCorrect: false,
          label:
            "Sudut 45 derajat selalu menghasilkan kenaikan 13 derajat Celsius dibandingkan oven tanpa reflektor pada ketiga putaran.",
        },
        {
          isCorrect: false,
          label:
            "Sudut 60 derajat lebih efektif pada iradiansi tinggi karena suhu akhirnya 64 derajat Celsius, lebih tinggi daripada hasil 45 derajat pada putaran pertama.",
        },
        {
          isCorrect: false,
          label:
            "Tanpa reflektor merupakan pembanding yang tidak sah karena suhu akhirnya berubah ketika iradiansi berubah.",
        },
        {
          isCorrect: false,
          label:
            "Karena posisi oven sudah diputar, cuaca tidak lagi dapat memengaruhi perbandingan antarputaran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
