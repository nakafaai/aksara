import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "57\\text{ kcal}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\text{ kcal}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "75\\text{ kcal}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72\\text{ kcal}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "87{,}72\\text{ kcal}" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "57\\text{ kcal}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\text{ kcal}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "75\\text{ kcal}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72\\text{ kcal}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "87.72\\text{ kcal}" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "57\\text{ kkal}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "70\\text{ kkal}" }],
        },
        {
          isCorrect: true,
          label: [{ display: "block", kind: "math", math: "75\\text{ kkal}" }],
        },
        {
          isCorrect: false,
          label: [{ display: "block", kind: "math", math: "72\\text{ kkal}" }],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "87{,}72\\text{ kkal}" },
          ],
        },
      ],
    },
  },
};

export default item;
