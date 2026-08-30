import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Deshalb blieb die Schlussfolgerung zu Schirmverleih am Bahnhof begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Die Zahlen stiegen. Dennoch blieb die Schlussfolgerung für diesen Kontext begrenzt: Schirmverleih am Bahnhof.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Außerdem blieb die Schlussfolgerung zu Schirmverleih am Bahnhof begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Zuvor blieb die Schlussfolgerung zu Schirmverleih am Bahnhof begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Folglich blieb die Schlussfolgerung zu Schirmverleih am Bahnhof begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The figures increased. Therefore, the conclusion about the station umbrella lending remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The figures increased. Nevertheless, the conclusion for this setting (station umbrella lending) remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Moreover, the conclusion about the station umbrella lending remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Previously, the conclusion about the station umbrella lending remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Consequently, the conclusion about the station umbrella lending remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Angka meningkat. Oleh karena itu, simpulan tentang peminjaman payung stasiun tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Angka meningkat. Namun, simpulan tentang peminjaman payung stasiun tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Selain itu, simpulan tentang peminjaman payung stasiun tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Sebelumnya, simpulan tentang peminjaman payung stasiun tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Akibatnya, simpulan tentang peminjaman payung stasiun tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
