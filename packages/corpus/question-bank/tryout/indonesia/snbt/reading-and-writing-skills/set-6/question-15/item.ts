import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Meldungen mit vollständigen Zeitangaben war höher. Deshalb blieb die Schlussfolgerung zum Lärmprotokoll begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Meldungen mit vollständigen Zeitangaben war höher. Außerdem blieb die Schlussfolgerung zum Lärmprotokoll begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Meldungen mit vollständigen Zeitangaben war höher. Zuvor blieb die Schlussfolgerung zum Lärmprotokoll begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Die mittlere Zahl der Meldungen mit vollständigen Zeitangaben war höher. Dennoch blieb die Schlussfolgerung zum Lärmprotokoll begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die mittlere Zahl der Meldungen mit vollständigen Zeitangaben war höher. Folglich blieb die Schlussfolgerung zum Lärmprotokoll begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The mean number of reports with complete timing was higher. Therefore, the conclusion about the noise log remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of reports with complete timing was higher. Moreover, the conclusion about the noise log remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of reports with complete timing was higher. Previously, the conclusion about the noise log remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The mean number of reports with complete timing was higher. Nevertheless, the conclusion about the noise log remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The mean number of reports with complete timing was higher. Consequently, the conclusion about the noise log remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Oleh karena itu, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Selain itu, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Sebelumnya, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Namun, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Rata-rata laporan dengan waktu lengkap lebih tinggi. Akibatnya, simpulan tentang pencatatan kebisingan tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
