import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "14" },
            { kind: "text", text: " Jahre" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "17" },
            { kind: "text", text: " Jahre" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "18" },
            { kind: "text", text: " Jahre" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20" },
            { kind: "text", text: " Jahre" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "22" },
            { kind: "text", text: " Jahre" },
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
            { display: "block", kind: "math", math: "14" },
            { kind: "text", text: " years" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "17" },
            { kind: "text", text: " years" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "18" },
            { kind: "text", text: " years" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20" },
            { kind: "text", text: " years" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "22" },
            { kind: "text", text: " years" },
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
            { display: "block", kind: "math", math: "14" },
            { kind: "text", text: " tahun" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "17" },
            { kind: "text", text: " tahun" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "18" },
            { kind: "text", text: " tahun" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "20" },
            { kind: "text", text: " tahun" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "22" },
            { kind: "text", text: " tahun" },
          ],
        },
      ],
    },
  },
};

export default item;
