import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "22" },
            { kind: "text", text: " Schülerinnen und Schüler" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "23" },
            { kind: "text", text: " Schülerinnen und Schüler" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "24" },
            { kind: "text", text: " Schülerinnen und Schüler" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "25" },
            { kind: "text", text: " Schülerinnen und Schüler" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "26" },
            { kind: "text", text: " Schülerinnen und Schüler" },
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
            { display: "block", kind: "math", math: "22" },
            { kind: "text", text: " students" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "23" },
            { kind: "text", text: " students" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "24" },
            { kind: "text", text: " students" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "25" },
            { kind: "text", text: " students" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "26" },
            { kind: "text", text: " students" },
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
            { display: "block", kind: "math", math: "22" },
            { kind: "text", text: " siswa" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "23" },
            { kind: "text", text: " siswa" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "24" },
            { kind: "text", text: " siswa" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "25" },
            { kind: "text", text: " siswa" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "26" },
            { kind: "text", text: " siswa" },
          ],
        },
      ],
    },
  },
};

export default item;
