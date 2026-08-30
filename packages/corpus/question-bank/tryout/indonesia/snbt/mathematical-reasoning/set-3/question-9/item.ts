import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "70" },
            { kind: "text", text: " Minuten oder " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "21" },
            { kind: "text", text: " Minuten oder " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "15" },
            { kind: "text", text: " Minuten oder " },
            { display: "block", kind: "math", math: "16" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " Minuten oder " },
            { display: "block", kind: "math", math: "40" },
            { kind: "text", text: " Minuten" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " Minuten oder " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " Minuten" },
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
            { display: "block", kind: "math", math: "70" },
            { kind: "text", text: " minutes or " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "21" },
            { kind: "text", text: " minutes or " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "15" },
            { kind: "text", text: " minutes or " },
            { display: "block", kind: "math", math: "16" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " minutes or " },
            { display: "block", kind: "math", math: "40" },
            { kind: "text", text: " minutes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " minutes or " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " minutes" },
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
            { display: "block", kind: "math", math: "70" },
            { kind: "text", text: " menit atau " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "21" },
            { kind: "text", text: " menit atau " },
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "15" },
            { kind: "text", text: " menit atau " },
            { display: "block", kind: "math", math: "16" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " menit atau " },
            { display: "block", kind: "math", math: "40" },
            { kind: "text", text: " menit" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10" },
            { kind: "text", text: " menit atau " },
            { display: "block", kind: "math", math: "30" },
            { kind: "text", text: " menit" },
          ],
        },
      ],
    },
  },
};

export default item;
