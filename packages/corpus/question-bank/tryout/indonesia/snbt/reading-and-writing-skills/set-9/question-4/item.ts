import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tablettetiketten machten die Zählung ohne Umleitung angekommener Setzlinge überflüssig.",
        },
        {
          isCorrect: false,
          label:
            "Tablettetiketten ermöglichten die gleichzeitige Änderung vieler Verteilungsmerkmale.",
        },
        {
          isCorrect: false,
          label:
            "Die Etiketten wurden gewählt, weil bereits alle Vergleichswerte nachweislich gleich waren.",
        },
        {
          isCorrect: false,
          label:
            "Die Etiketten wurden nur gewählt, weil das endgültige Testergebnis bereits feststand.",
        },
        {
          isCorrect: true,
          label:
            "Ein Etikett am Tablett nannte die Zielfläche, wenn die Helfenden an der Abzweigung eine Richtung wählen mussten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tray labels made it unnecessary to count seedlings arriving without redirection.",
        },
        {
          isCorrect: false,
          label:
            "Tray labels allowed many distribution features to change at once.",
        },
        {
          isCorrect: false,
          label:
            "The labels were chosen because all comparison values had proved equal.",
        },
        {
          isCorrect: false,
          label:
            "The labels were chosen only because the final test result was already certain.",
        },
        {
          isCorrect: true,
          label:
            "A tray label identified the intended plot when volunteers had to choose a direction at the junction.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Label baki membuat jumlah bibit yang sampai tanpa dialihkan tidak perlu diukur.",
        },
        {
          isCorrect: false,
          label:
            "Label baki memungkinkan banyak unsur distribusi diubah sekaligus.",
        },
        {
          isCorrect: false,
          label:
            "Label dipilih karena semua nilai pembanding sudah terbukti sama.",
        },
        {
          isCorrect: false,
          label:
            "Label dipilih hanya karena hasil akhir pengujiannya telah dipastikan.",
        },
        {
          isCorrect: true,
          label:
            "Label pada baki menunjukkan petak tujuan ketika relawan harus memilih arah di percabangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
