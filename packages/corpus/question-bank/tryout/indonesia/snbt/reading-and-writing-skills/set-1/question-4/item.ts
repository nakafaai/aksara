import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " enthält einen Zeichensetzungsfehler." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Verbindung *Als Inselstaat, daher ...* macht Satz ",
            },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " grammatisch fehlerhaft." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " verwendet die falsche Konjunktion." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " benötigt ein zusätzliches Komma." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: " ist unnötig weitschweifig." },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sentence " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " contains a punctuation error." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The pattern *As an archipelagic country, therefore ...* makes sentence ",
            },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " ineffective." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sentence " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " uses the wrong conjunction." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sentence " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " needs an additional comma." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sentence " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: " is needlessly wordy." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kalimat " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " mengandung kesalahan tanda baca." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Pola *Sebagai negara kepulauan, maka ...* membuat kalimat ",
            },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " tidak efektif." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kalimat " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " menggunakan konjungsi yang salah." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kalimat " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " memerlukan tambahan tanda koma." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kalimat " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: " mengandung pemborosan kata." },
          ],
        },
      ],
    },
  },
};

export default item;
