import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Deshalb blieb die Schlussfolgerung zu Kompostierworkshop begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Außerdem blieb die Schlussfolgerung zu Kompostierworkshop begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Zuvor blieb die Schlussfolgerung zu Kompostierworkshop begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Folglich blieb die Schlussfolgerung zu Kompostierworkshop begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Die Zahlen stiegen. Dennoch blieb die Schlussfolgerung für diesen Kontext begrenzt: Kompostierworkshop.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The figures increased. Therefore, the conclusion about the composting workshop remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Moreover, the conclusion about the composting workshop remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Previously, the conclusion about the composting workshop remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Consequently, the conclusion about the composting workshop remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The figures increased. Nevertheless, the conclusion for this setting (composting workshop) remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Angka meningkat. Oleh karena itu, simpulan tentang lokakarya pembuatan kompos tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Selain itu, simpulan tentang lokakarya pembuatan kompos tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Sebelumnya, simpulan tentang lokakarya pembuatan kompos tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Akibatnya, simpulan tentang lokakarya pembuatan kompos tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Angka meningkat. Namun, simpulan tentang lokakarya pembuatan kompos tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
