import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Mittelwert war im Versuch höher. Deshalb blieb die Schlussfolgerung zum Büchertauschmarkt begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Mittelwert war im Versuch höher. Außerdem blieb die Schlussfolgerung zum Büchertauschmarkt begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Mittelwert war im Versuch höher. Zuvor blieb die Schlussfolgerung zum Büchertauschmarkt begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Mittelwert war im Versuch höher. Folglich blieb die Schlussfolgerung zum Büchertauschmarkt begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Der Mittelwert war im Versuch höher. Dennoch blieb die Schlussfolgerung zum Büchertauschmarkt begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Therefore, the conclusion about the book exchange remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Moreover, the conclusion about the book exchange remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Previously, the conclusion about the book exchange remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Consequently, the conclusion about the book exchange remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The trial mean was higher. Nevertheless, the conclusion about the book exchange remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Oleh karena itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Selain itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Sebelumnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata sesi uji lebih tinggi. Akibatnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata sesi uji lebih tinggi. Namun, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
