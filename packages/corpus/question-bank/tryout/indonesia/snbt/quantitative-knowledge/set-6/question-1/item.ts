import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Aussage " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " allein ist ausreichend, Aussage " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " allein jedoch nicht." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Aussage " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " allein ist ausreichend, Aussage " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " allein jedoch nicht." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Beide Aussagen zusammen sind ausreichend, aber keine Aussage allein ist ausreichend.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Aussage " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " allein ist ausreichend, und Aussage " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " allein ist ausreichend." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Aussagen " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " sind auch zusammen nicht ausreichend." },
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
            { kind: "text", text: " ALONE is sufficient, but statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " alone is not sufficient." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " ALONE is sufficient, but statement " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " alone is not sufficient." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " ALONE is sufficient, and statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " ALONE is sufficient." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statements " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " TOGETHER are NOT sufficient." },
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
            {
              kind: "text",
              text: " saja cukup untuk menjawab pertanyaan tetapi pernyataan ",
            },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " saja tidak cukup." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            {
              kind: "text",
              text: " saja cukup untuk menjawab pertanyaan tetapi pernyataan ",
            },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " saja tidak cukup." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Dua pernyataan bersama-sama cukup untuk menjawab pertanyaan, tetapi satu pernyataan saja tidak cukup.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            {
              kind: "text",
              text: " saja cukup untuk menjawab pertanyaan dan pernyataan ",
            },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " saja cukup." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " tidak cukup untuk menjawab pertanyaan." },
          ],
        },
      ],
    },
  },
};

export default item;
