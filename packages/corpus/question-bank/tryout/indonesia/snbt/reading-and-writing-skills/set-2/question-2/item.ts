import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(11)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(12)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(13)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(14)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Satz " },
            { display: "block", kind: "math", math: "(15)" },
            { kind: "text", text: "." },
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
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(11)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(12)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(13)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(14)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "sentence " },
            { display: "block", kind: "math", math: "(15)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(11)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(12)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(13)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(14)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kalimat " },
            { display: "block", kind: "math", math: "(15)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
