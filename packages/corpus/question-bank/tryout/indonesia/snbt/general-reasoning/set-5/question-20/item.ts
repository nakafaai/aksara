import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Das erste Ergebnis, bei dem die Beschäftigten kündigen und eine Abfindung erhalten, tritt nicht ein",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Beschäftigten haben die Schließung des Unternehmens gewählt",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Einige Beschäftigte erhalten nach dem ersten Ergebnis eine Abfindung",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Beide Ergebnisse treten ein" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Keines der beiden Ergebnisse tritt ein" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The first outcome, in which employees resign and receive severance pay, does not occur",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The employees chose to close the company" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Some employees receive severance pay under the first outcome",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Both outcomes occur" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Neither outcome occurs" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Hasil pertama, yaitu karyawan mengundurkan diri dan menerima pesangon, tidak terjadi",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Karyawan memilih untuk menutup perusahaan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebagian karyawan menerima pesangon menurut hasil pertama",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kedua hasil terjadi" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tidak satu pun hasil terjadi" }],
        },
      ],
    },
  },
};

export default item;
