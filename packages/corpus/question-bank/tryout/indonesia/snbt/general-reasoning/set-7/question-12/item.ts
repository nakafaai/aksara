import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}75\\text{ Meter}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}85\\text{ Meter}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}90\\text{ Meter}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2{,}00\\text{ Meter}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2{,}10\\text{ Meter}" },
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
            { display: "block", kind: "math", math: "1.75\\text{ meters}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1.85\\text{ meters}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1.90\\text{ meters}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2.00\\text{ meters}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2.10\\text{ meters}" },
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
            { display: "block", kind: "math", math: "1{,}75\\text{ meter}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}85\\text{ meter}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}90\\text{ meter}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "2{,}00\\text{ meter}" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2{,}10\\text{ meter}" },
          ],
        },
      ],
    },
  },
};

export default item;
