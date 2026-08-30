import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Snackstrauß und " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " Geldsträuße" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " Snacksträuße und " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " Geldsträuße" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " großer Blumenstrauß und " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " Geldsträuße" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " großer Blumenstrauß und " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " Snacksträuße" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " kleiner Blumenstrauß und " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " Snacksträuße" },
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
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " snack bouquet and " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " money bouquets" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " snack bouquets and " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " money bouquets" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " large flower and " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " money bouquets" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " large flower and " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " snack bouquets" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " small flower and " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " snack bouquets" },
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
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " snack bouquet dan " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " money bouquet" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " snack bouquet dan " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " money bouquet" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " bunga besar dan " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " money bouquet" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " bunga besar dan " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " snack bouquet" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " bunga kecil dan " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " snack bouquet" },
          ],
        },
      ],
    },
  },
};

export default item;
