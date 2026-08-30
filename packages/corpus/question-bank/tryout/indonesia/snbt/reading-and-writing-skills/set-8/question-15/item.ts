import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Deshalb blieb die Schlussfolgerung zu Fundbüroservice begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Außerdem blieb die Schlussfolgerung zu Fundbüroservice begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Die Zahlen stiegen. Dennoch blieb die Schlussfolgerung für diesen Kontext begrenzt: Fundbüroservice.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Zuvor blieb die Schlussfolgerung zu Fundbüroservice begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Folglich blieb die Schlussfolgerung zu Fundbüroservice begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The figures increased. Therefore, the conclusion about the lost-property service remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Moreover, the conclusion about the lost-property service remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The figures increased. Nevertheless, the conclusion for this setting (lost-property service) remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Previously, the conclusion about the lost-property service remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Consequently, the conclusion about the lost-property service remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Angka meningkat. Oleh karena itu, simpulan tentang layanan pencarian barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Selain itu, simpulan tentang layanan pencarian barang hilang tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Angka meningkat. Namun, simpulan tentang layanan pencarian barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Sebelumnya, simpulan tentang layanan pencarian barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Akibatnya, simpulan tentang layanan pencarian barang hilang tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
