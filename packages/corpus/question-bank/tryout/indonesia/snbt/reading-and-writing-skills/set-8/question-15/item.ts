import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Die mittlere Zahl der Zuordnungen am selben Tag war höher. Dennoch blieb die Schlussfolgerung zum Fundbüro begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Zuordnungen am selben Tag war höher. Deshalb blieb die Schlussfolgerung zum Fundbüro begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Zuordnungen am selben Tag war höher. Außerdem blieb die Schlussfolgerung zum Fundbüro begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Zuordnungen am selben Tag war höher. Zuvor blieb die Schlussfolgerung zum Fundbüro begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Zuordnungen am selben Tag war höher. Folglich blieb die Schlussfolgerung zum Fundbüro begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The mean number of same-day matches was higher. Nevertheless, the conclusion about the lost-property service remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of same-day matches was higher. Therefore, the conclusion about the lost-property service remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of same-day matches was higher. Moreover, the conclusion about the lost-property service remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of same-day matches was higher. Previously, the conclusion about the lost-property service remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of same-day matches was higher. Consequently, the conclusion about the lost-property service remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Namun, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Oleh karena itu, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Selain itu, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Sebelumnya, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata pencocokan pada hari yang sama lebih tinggi. Akibatnya, simpulan tentang layanan barang hilang tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
