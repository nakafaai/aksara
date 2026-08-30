import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "0" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "-1" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "0" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "1" },
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
            { display: "block", kind: "math", math: "0" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "-1" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "0" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "1" },
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
            { display: "block", kind: "math", math: "0" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "-1" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "0" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "1" },
          ],
        },
      ],
    },
  },
};

export default item;
