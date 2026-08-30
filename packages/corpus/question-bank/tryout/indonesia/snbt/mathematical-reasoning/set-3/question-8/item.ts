import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "180" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "20" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "180" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "10" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "170" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "15" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "170" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "20" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "160" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "25" },
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
            { display: "block", kind: "math", math: "180" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "20" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "180" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "10" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "170" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "15" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "170" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "20" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "160" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "25" },
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
            { display: "block", kind: "math", math: "180" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "20" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "180" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "10" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "170" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "15" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "170" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "20" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "160" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "25" },
          ],
        },
      ],
    },
  },
};

export default item;
