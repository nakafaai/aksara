import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Deshalb blieb die Schlussfolgerung zu Lärmprotokoll im Wohngebiet begrenzt.",
        },
        {
          isCorrect: true,
          label:
            "Die Zahlen stiegen. Dennoch blieb die Schlussfolgerung für diesen Kontext begrenzt: Lärmprotokoll im Wohngebiet.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Außerdem blieb die Schlussfolgerung zu Lärmprotokoll im Wohngebiet begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Zuvor blieb die Schlussfolgerung zu Lärmprotokoll im Wohngebiet begrenzt.",
        },
        {
          isCorrect: false,
          label:
            "Die Zahlen stiegen. Folglich blieb die Schlussfolgerung zu Lärmprotokoll im Wohngebiet begrenzt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The figures increased. Therefore, the conclusion about the neighbourhood noise log remained limited.",
        },
        {
          isCorrect: true,
          label:
            "The figures increased. Nevertheless, the conclusion for this setting (neighbourhood noise log) remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Moreover, the conclusion about the neighbourhood noise log remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Previously, the conclusion about the neighbourhood noise log remained limited.",
        },
        {
          isCorrect: false,
          label:
            "The figures increased. Consequently, the conclusion about the neighbourhood noise log remained limited.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Angka meningkat. Oleh karena itu, simpulan tentang pencatatan kebisingan lingkungan tetap dibatasi.",
        },
        {
          isCorrect: true,
          label:
            "Angka meningkat. Namun, simpulan tentang pencatatan kebisingan lingkungan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Selain itu, simpulan tentang pencatatan kebisingan lingkungan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Sebelumnya, simpulan tentang pencatatan kebisingan lingkungan tetap dibatasi.",
        },
        {
          isCorrect: false,
          label:
            "Angka meningkat. Akibatnya, simpulan tentang pencatatan kebisingan lingkungan tetap dibatasi.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
