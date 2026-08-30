import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

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
            { kind: "text", text: " ist größer als " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Größe " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " ist kleiner als " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Größe " },
            { display: "block", kind: "math", math: "P" },
            { kind: "text", text: " ist gleich " },
            { display: "block", kind: "math", math: "Q" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Informationen reichen nicht aus, um den Zusammenhang festzustellen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Beide Größen sind nicht definiert" }],
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
            {
              kind: "text",
              text: "The information is insufficient to determine the relationship",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Neither quantity is defined" }],
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
              text: "Informasi tidak cukup untuk menentukan hubungan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kedua kuantitas tidak terdefinisi" }],
        },
      ],
    },
  },
};

export default item;
