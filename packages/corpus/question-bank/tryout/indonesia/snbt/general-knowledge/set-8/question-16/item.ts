import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Prüfung oder Anpassung an einer Referenz, damit Ergebnisse richtig gedeutet werden können",
        },
        {
          isCorrect: false,
          label: "die Zahl der Meldungen ohne Genauigkeitsprüfung erhöhen",
        },
        {
          isCorrect: false,
          label: "alle vom Anfangsverdacht abweichenden Ergebnisse entfernen",
        },
        {
          isCorrect: false,
          label:
            "alle Beobachtungen ohne Berücksichtigung der Besuchschance mitteln",
        },
        {
          isCorrect: false,
          label: "Expertenurteile als unfehlbar und prüfungsfrei behandeln",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "checking or adjusting against a reference so results can be interpreted accurately",
        },
        {
          isCorrect: false,
          label: "increasing the number of reports without checking accuracy",
        },
        {
          isCorrect: false,
          label:
            "removing every result that differs from the initial expectation",
        },
        {
          isCorrect: false,
          label:
            "averaging all observations without accounting for visit opportunity",
        },
        {
          isCorrect: false,
          label:
            "treating expert judgement as infallible and exempt from testing",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "penyesuaian atau pemeriksaan terhadap acuan agar hasil dapat ditafsirkan secara tepat",
        },
        {
          isCorrect: false,
          label: "menambah jumlah laporan tanpa memeriksa ketepatannya",
        },
        {
          isCorrect: false,
          label: "menghapus semua hasil yang berbeda dari dugaan awal",
        },
        {
          isCorrect: false,
          label:
            "merata-ratakan seluruh pengamatan tanpa memperhitungkan peluang kunjungan",
        },
        {
          isCorrect: false,
          label: "menganggap penilaian ahli selalu benar dan tidak perlu diuji",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
