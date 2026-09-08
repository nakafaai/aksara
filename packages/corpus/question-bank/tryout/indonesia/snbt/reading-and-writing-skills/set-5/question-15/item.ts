import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Aufnahmen ohne technisch bedingte Wiederholung war höher. Deshalb blieb die Schlussfolgerung zum Versuch im Schulstudio begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Aufnahmen ohne technisch bedingte Wiederholung war höher. Außerdem blieb die Schlussfolgerung zum Versuch im Schulstudio begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Die mittlere Zahl der Aufnahmen ohne technisch bedingte Wiederholung war höher. Dennoch blieb die Schlussfolgerung zum Versuch im Schulstudio begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Aufnahmen ohne technisch bedingte Wiederholung war höher. Zuvor blieb die Schlussfolgerung zum Versuch im Schulstudio begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Aufnahmen ohne technisch bedingte Wiederholung war höher. Folglich blieb die Schlussfolgerung zum Versuch im Schulstudio begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The mean number of recordings without technical retakes was higher. Therefore, the conclusion about the school-studio trial remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of recordings without technical retakes was higher. Moreover, the conclusion about the school-studio trial remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The mean number of recordings without technical retakes was higher. Nevertheless, the conclusion about the school-studio trial remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of recordings without technical retakes was higher. Previously, the conclusion about the school-studio trial remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of recordings without technical retakes was higher. Consequently, the conclusion about the school-studio trial remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Oleh karena itu, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Selain itu, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Namun, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Sebelumnya, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata rekaman tanpa pengulangan teknis lebih tinggi. Akibatnya, simpulan tentang uji di studio sekolah tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
