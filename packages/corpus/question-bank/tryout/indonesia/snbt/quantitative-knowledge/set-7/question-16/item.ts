import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "120{.}000" },
            { kind: "text", text: " Rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "160{.}000" },
            { kind: "text", text: " Rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "200{.}000" },
            { kind: "text", text: " Rupiah" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "240{.}000" },
            { kind: "text", text: " Rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "280{.}000" },
            { kind: "text", text: " Rupiah" },
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
            { display: "block", kind: "math", math: "120{,}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "160{,}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "200{,}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "240{,}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "280{,}000" },
            { kind: "text", text: " rupiah" },
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
            { display: "block", kind: "math", math: "120{.}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "160{.}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "200{.}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "240{.}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "280{.}000" },
            { kind: "text", text: " rupiah" },
          ],
        },
      ],
    },
  },
};

export default item;
