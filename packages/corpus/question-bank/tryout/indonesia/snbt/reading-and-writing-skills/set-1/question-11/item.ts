import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "widerstandsfähig (Satz " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Folge (Satz " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "erfüllen (Satz " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "nennt (Satz " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "verringern (Satz " },
            { display: "block", kind: "math", math: "(7)" },
            { kind: "text", text: ")." },
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
            { kind: "text", text: "resilient (sentence " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "consequence (sentence " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "meet (sentence " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "recognizes (sentence " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "reduce (sentence " },
            { display: "block", kind: "math", math: "(7)" },
            { kind: "text", text: ")." },
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
            { kind: "text", text: "tangguh (kalimat " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "akibat (kalimat " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "memenuhi (kalimat " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "mengakui (kalimat " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: ")." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "memperkecil (kalimat " },
            { display: "block", kind: "math", math: "(7)" },
            { kind: "text", text: ")." },
          ],
        },
      ],
    },
  },
};

export default item;
