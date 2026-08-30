import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "10{.}000" },
            { kind: "text", text: " Stimmen" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "30{.}000" },
            { kind: "text", text: " Stimmen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "50{.}000" },
            { kind: "text", text: " Stimmen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "60{.}000" },
            { kind: "text", text: " Stimmen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "80{.}000" },
            { kind: "text", text: " Stimmen" },
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
            { display: "block", kind: "math", math: "10{,}000" },
            { kind: "text", text: " votes" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "30{,}000" },
            { kind: "text", text: " votes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "50{,}000" },
            { kind: "text", text: " votes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "60{,}000" },
            { kind: "text", text: " votes" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "80{,}000" },
            { kind: "text", text: " votes" },
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
            { display: "block", kind: "math", math: "10{.}000" },
            { kind: "text", text: " suara" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "30{.}000" },
            { kind: "text", text: " suara" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "50{.}000" },
            { kind: "text", text: " suara" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "60{.}000" },
            { kind: "text", text: " suara" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "80{.}000" },
            { kind: "text", text: " suara" },
          ],
        },
      ],
    },
  },
};

export default item;
