import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "eine vorläufige, überprüfbare Annahme entwickeln",
        },
        {
          isCorrect: false,
          label: "eine Ursache als endgültige Schlussfolgerung festlegen",
        },
        {
          isCorrect: false,
          label: "Daten entfernen, die nicht zur Erwartung passen",
        },
        {
          isCorrect: false,
          label: "Ergebnisse erst nach Abschluss aller Versuche zusammenfassen",
        },
        {
          isCorrect: false,
          label: "Messungen durch Einschätzungen der Teilnehmenden ersetzen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "developing a provisional claim that can be tested",
        },
        {
          isCorrect: false,
          label: "establishing a cause as the final conclusion",
        },
        {
          isCorrect: false,
          label: "removing data that do not fit an expectation",
        },
        {
          isCorrect: false,
          label: "summarising results after every trial is complete",
        },
        {
          isCorrect: false,
          label: "replacing measurement with participants' opinions",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "menyusun dugaan sementara yang dapat diuji",
        },
        {
          isCorrect: false,
          label: "menetapkan penyebab sebagai simpulan akhir",
        },
        {
          isCorrect: false,
          label: "menghapus data yang tidak sesuai dengan dugaan",
        },
        {
          isCorrect: false,
          label: "merangkum hasil setelah seluruh uji selesai",
        },
        {
          isCorrect: false,
          label: "mengganti pengukuran dengan penilaian peserta",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
