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
            { kind: "text", text: " allein reicht aus, Aussage " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " allein jedoch nicht" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Aussage " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " allein reicht aus, Aussage " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " allein jedoch nicht" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beide Aussagen zusammen reichen aus, aber keine Aussage allein",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Aussage " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " allein reicht aus, und Aussage " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " allein reicht aus" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Aussagen " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " reichen auch zusammen nicht aus" },
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
            { kind: "text", text: " ALONE is not sufficient" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " ALONE is sufficient, but statement " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " ALONE is not sufficient" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient",
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
            { kind: "text", text: " ALONE is sufficient" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statements " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " TOGETHER are NOT sufficient" },
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
              text: " SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan ",
            },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " SAJA tidak cukup" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            {
              kind: "text",
              text: " SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan ",
            },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " SAJA tidak cukup" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup",
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
              text: " SAJA cukup untuk menjawab pertanyaan dan pernyataan ",
            },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " SAJA cukup untuk menjawab pertanyaan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " tidak cukup untuk menjawab pertanyaan" },
          ],
        },
      ],
    },
  },
};

export default item;
