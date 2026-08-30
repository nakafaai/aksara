import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Jahr " },
            { display: "block", kind: "math", math: "1" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jahr " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jahr " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jahr " },
            { display: "block", kind: "math", math: "4" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jahr " },
            { display: "block", kind: "math", math: "5" },
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
            { kind: "text", text: "Year " },
            { display: "block", kind: "math", math: "1" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Year " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Year " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Year " },
            { display: "block", kind: "math", math: "4" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Year " },
            { display: "block", kind: "math", math: "5" },
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
            { kind: "text", text: "Tahun ke-" },
            { display: "block", kind: "math", math: "1" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tahun ke-" },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tahun ke-" },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tahun ke-" },
            { display: "block", kind: "math", math: "4" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Tahun ke-" },
            { display: "block", kind: "math", math: "5" },
          ],
        },
      ],
    },
  },
};

export default item;
