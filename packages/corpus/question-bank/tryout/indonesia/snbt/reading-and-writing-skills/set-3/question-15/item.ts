import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der Versuchsmittelwert war höher. Deshalb blieb die Schlussfolgerung begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchsmittelwert war höher. Außerdem blieb die Schlussfolgerung begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchsmittelwert war höher. Dennoch blieb die Schlussfolgerung begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchsmittelwert war höher. Zuvor blieb die Schlussfolgerung begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuchsmittelwert war höher. Folglich blieb die Schlussfolgerung begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Therefore, the conclusion remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Moreover, the conclusion remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The trial mean was higher. Nevertheless, the conclusion remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Previously, the conclusion remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The trial mean was higher. Consequently, the conclusion remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Oleh karena itu, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Selain itu, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata hasil uji lebih tinggi. Namun, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Sebelumnya, simpulannya tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata hasil uji lebih tinggi. Akibatnya, simpulannya tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
