import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "186" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "187" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "188" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "46" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "189" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "46" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "190" },
            { kind: "text", text: " Personen" },
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
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "186" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "187" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "188" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "46" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "189" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "46" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "190" },
            { kind: "text", text: " people" },
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
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "186" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "187" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "45" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "188" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "46" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "189" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "46" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "190" },
            { kind: "text", text: " orang" },
          ],
        },
      ],
    },
  },
};

export default item;
