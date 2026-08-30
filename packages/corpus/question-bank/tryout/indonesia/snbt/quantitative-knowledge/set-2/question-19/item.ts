import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Größe " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " ist größer als Größe " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Größe " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " ist kleiner als Größe " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Größe " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " ist gleich Größe " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Beziehung zwischen den Größen " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "Q" },
            { kind: "text", text: " lässt sich nicht bestimmen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die bereitgestellten Informationen reichen nicht aus, um sich für eine der drei oben genannten Optionen zu entscheiden",
            },
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
            { kind: "text", text: "Quantity " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " is greater than " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Quantity " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " is less than " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Quantity " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " is equal to " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The relationship between quantity " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "Q" },
            { kind: "text", text: " cannot be determined" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The information provided is not sufficient to decide one of the three options above",
            },
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
            { kind: "text", text: "Kuantitas " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " lebih besar daripada " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Kuantitas " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " lebih kecil daripada " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kuantitas " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " sama dengan " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak dapat ditentukan hubungan antara kuantitas ",
            },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Informasi yang diberikan tidak cukup untuk memutuskan salah satu dari tiga pilihan di atas",
            },
          ],
        },
      ],
    },
  },
};

export default item;
