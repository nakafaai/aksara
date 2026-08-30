import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }10{.}500{,}00",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }10{.}000{,}00",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp }9{.}500{,}00" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp }9{.}000{,}00" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp }8{.}500{,}00" },
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
            { display: "block", kind: "math", math: "\\text{Rp10{,}500.00}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp10{,}000.00}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp9{,}500.00}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp9{,}000.00}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp8{,}500.00}" },
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
            { display: "block", kind: "math", math: "\\text{Rp10{.}500{,}00}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp10{.}000{,}00}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp9{.}500{,}00}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp9{.}000{,}00}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "\\text{Rp8{.}500{,}00}" },
          ],
        },
      ],
    },
  },
};

export default item;
