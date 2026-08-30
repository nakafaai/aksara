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
            { kind: "text", text: " allein jedoch nicht." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Aussage " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " allein reicht aus, Aussage " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " allein jedoch nicht." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beide Aussagen zusammen reichen aus, aber keine Aussage allein.",
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
            { kind: "text", text: " allein reicht aus." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Aussagen " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " reichen auch zusammen nicht aus." },
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
            { kind: "text", text: " alone is sufficient, but statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " alone is not sufficient." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " alone is sufficient, but statement " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " alone is not sufficient." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Both statements together are sufficient, but neither statement alone is sufficient.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statement " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " alone is sufficient, and statement " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " alone is sufficient." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Statements " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " together are not sufficient." },
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
            { kind: "text", text: " saja cukup, tetapi pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " saja tidak cukup." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " saja cukup, tetapi pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " saja tidak cukup." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kedua pernyataan bersama-sama cukup, tetapi masing-masing pernyataan saja tidak cukup.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " saja sudah cukup, dan pernyataan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " saja sudah cukup." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pernyataan " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " bersama-sama tidak cukup." },
          ],
        },
      ],
    },
  },
};

export default item;
