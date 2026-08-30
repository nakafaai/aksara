import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "4" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Nur " },
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "4" },
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
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: ", and " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "4" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " only" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: ", and " },
            { display: "block", kind: "math", math: "4" },
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
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: ", dan " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "3" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "4" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " saja" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "3" },
            { kind: "text", text: ", dan " },
            { display: "block", kind: "math", math: "4" },
          ],
        },
      ],
    },
  },
};

export default item;
