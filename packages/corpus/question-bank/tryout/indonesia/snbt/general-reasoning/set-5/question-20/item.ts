import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das erste Ergebnis, bei dem die Beschäftigten kündigen und eine Abfindung erhalten, tritt nicht ein",
        },
        {
          isCorrect: false,
          label:
            "Die Beschäftigten haben die Schließung des Unternehmens gewählt",
        },
        {
          isCorrect: false,
          label:
            "Einige Beschäftigte erhalten nach dem ersten Ergebnis eine Abfindung",
        },
        {
          isCorrect: false,
          label: "Beide Ergebnisse treten ein",
        },
        {
          isCorrect: false,
          label: "Keines der beiden Ergebnisse tritt ein",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The first outcome, in which employees resign and receive severance pay, does not occur",
        },
        {
          isCorrect: false,
          label: "The employees chose to close the company",
        },
        {
          isCorrect: false,
          label: "Some employees receive severance pay under the first outcome",
        },
        {
          isCorrect: false,
          label: "Both outcomes occur",
        },
        {
          isCorrect: false,
          label: "Neither outcome occurs",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Hasil pertama, yaitu karyawan mengundurkan diri dan menerima pesangon, tidak terjadi",
        },
        {
          isCorrect: false,
          label: "Karyawan memilih untuk menutup perusahaan",
        },
        {
          isCorrect: false,
          label: "Sebagian karyawan menerima pesangon menurut hasil pertama",
        },
        {
          isCorrect: false,
          label: "Kedua hasil terjadi",
        },
        {
          isCorrect: false,
          label: "Tidak satu pun hasil terjadi",
        },
      ],
    },
  },
};

export default item;
