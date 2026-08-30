import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die Zahlen stiegen. Dennoch blieb die Schlussfolgerung für diesen Kontext begrenzt: Büchertauschmarkt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Deshalb blieb die Schlussfolgerung zu Büchertauschmarkt begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Außerdem blieb die Schlussfolgerung zu Büchertauschmarkt begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Zuvor blieb die Schlussfolgerung zu Büchertauschmarkt begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Folglich blieb die Schlussfolgerung zu Büchertauschmarkt begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The figures increased. Nevertheless, the conclusion for this setting (book exchange market) remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Therefore, the conclusion about the book exchange market remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Moreover, the conclusion about the book exchange market remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Previously, the conclusion about the book exchange market remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Consequently, the conclusion about the book exchange market remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Angka meningkat. Namun, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Oleh karena itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Selain itu, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Sebelumnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Akibatnya, simpulan tentang pasar tukar buku tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
