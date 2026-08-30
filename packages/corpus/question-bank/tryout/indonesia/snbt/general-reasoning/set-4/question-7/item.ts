import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " dann " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A \\neq B" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "E \\neq F" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "A \\neq B" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " oder " },
            { display: "block", kind: "math", math: "E \\neq F" },
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
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " then " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A \\neq B" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "E \\neq F" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "A \\neq B" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " or " },
            { display: "block", kind: "math", math: "E \\neq F" },
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
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " maka " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "A \\neq B" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "E = F" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "E \\neq F" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "A \\neq B" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "A = B" },
            { kind: "text", text: " atau " },
            { display: "block", kind: "math", math: "E \\neq F" },
          ],
        },
      ],
    },
  },
};

export default item;
