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
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(8)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(10)" },
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
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(8)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(10)" },
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
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(8)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(10)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
