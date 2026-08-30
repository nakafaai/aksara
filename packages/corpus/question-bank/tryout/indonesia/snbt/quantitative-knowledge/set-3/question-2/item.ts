import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "-5" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "5" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "-2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "5" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-4" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "-2" },
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
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "-5" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "5" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "-2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "5" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-4" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "-2" },
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
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "-5" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "5" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "-2" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-2" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "5" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "-4" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "-2" },
          ],
        },
      ],
    },
  },
};

export default item;
