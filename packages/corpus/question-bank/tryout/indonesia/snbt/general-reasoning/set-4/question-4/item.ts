import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "52{,}3\\text{ g}" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "10{,}85\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "52{,}3\\text{ g}" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "10{,}58\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "53{,}2\\text{ g}" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "10{,}58\\text{ g}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "53{,}2\\text{ g}" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "10{,}85\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "52{,}3\\text{ g}" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "10{,}50\\text{ g}" },
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
            { display: "block", kind: "math", math: "52.3\\text{ g}" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "10.85\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "52.3\\text{ g}" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "10.58\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "53.2\\text{ g}" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "10.58\\text{ g}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "53.2\\text{ g}" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "10.85\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "52.3\\text{ g}" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "10.50\\text{ g}" },
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
            { display: "block", kind: "math", math: "52{,}3\\text{ g}" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "10{,}85\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "52{,}3\\text{ g}" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "10{,}58\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "53{,}2\\text{ g}" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "10{,}58\\text{ g}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "53{,}2\\text{ g}" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "10{,}85\\text{ g}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "52{,}3\\text{ g}" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "10{,}50\\text{ g}" },
          ],
        },
      ],
    },
  },
};

export default item;
