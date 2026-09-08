import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Rückgaben innerhalb von zwei Tagen war höher. Deshalb blieb die Schlussfolgerung zum Schirmverleih begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Rückgaben innerhalb von zwei Tagen war höher. Außerdem blieb die Schlussfolgerung zum Schirmverleih begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Rückgaben innerhalb von zwei Tagen war höher. Zuvor blieb die Schlussfolgerung zum Schirmverleih begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Die mittlere Zahl der Rückgaben innerhalb von zwei Tagen war höher. Dennoch blieb die Schlussfolgerung zum Schirmverleih begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Rückgaben innerhalb von zwei Tagen war höher. Folglich blieb die Schlussfolgerung zum Schirmverleih begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The mean number of returns within two days was higher. Therefore, the conclusion about umbrella lending remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of returns within two days was higher. Moreover, the conclusion about umbrella lending remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of returns within two days was higher. Previously, the conclusion about umbrella lending remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The mean number of returns within two days was higher. Nevertheless, the conclusion about umbrella lending remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of returns within two days was higher. Consequently, the conclusion about umbrella lending remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Oleh karena itu, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Selain itu, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Sebelumnya, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Namun, simpulan tentang peminjaman payung tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pengembalian dalam dua hari lebih tinggi. Akibatnya, simpulan tentang peminjaman payung tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
