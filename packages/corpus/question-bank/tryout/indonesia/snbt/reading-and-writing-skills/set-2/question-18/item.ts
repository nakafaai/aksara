import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(1)\rightarrow(5)\rightarrow(4)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(4)\rightarrow(5)\rightarrow(1)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(4)\rightarrow(2)\rightarrow(3)\rightarrow(1)\rightarrow(5)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(5)\rightarrow(4)\rightarrow(1)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(5)\rightarrow(4)\rightarrow(1)\rightarrow(2)\rightarrow(3)",
            },
            { kind: "text", text: "." },
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
            {
              display: "block",
              kind: "math",
              math: "(1)\rightarrow(5)\rightarrow(4)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(4)\rightarrow(5)\rightarrow(1)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(4)\rightarrow(2)\rightarrow(3)\rightarrow(1)\rightarrow(5)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(5)\rightarrow(4)\rightarrow(1)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(5)\rightarrow(4)\rightarrow(1)\rightarrow(2)\rightarrow(3)",
            },
            { kind: "text", text: "." },
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
            {
              display: "block",
              kind: "math",
              math: "(1)\rightarrow(5)\rightarrow(4)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(4)\rightarrow(5)\rightarrow(1)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(4)\rightarrow(2)\rightarrow(3)\rightarrow(1)\rightarrow(5)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(5)\rightarrow(4)\rightarrow(1)\rightarrow(3)\rightarrow(2)",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "(5)\rightarrow(4)\rightarrow(1)\rightarrow(2)\rightarrow(3)",
            },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
