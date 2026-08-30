import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Anweisung " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " ist ausreichend." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Die Anweisung " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " ist ausreichend." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Anweisungen " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(2)" },
            {
              kind: "text",
              text: " sind ausreichend, wenn sie zusammen verwendet werden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Anweisung " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " ist ausreichend, Anweisung " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " ist ausreichend." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Anweisungen " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " sind nicht ausreichend." },
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
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " is sufficient." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " is sufficient." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statements " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " are sufficient if used together." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " is sufficient, statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " is sufficient." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statements " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " are not sufficient." },
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
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " cukup." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " cukup." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " cukup jika digunakan bersama-sama." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " cukup, pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " cukup." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " tidak cukup." },
          ],
        },
      ],
    },
  },
};

export default item;
