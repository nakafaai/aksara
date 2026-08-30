import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "97{,}5" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "95{,}0" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "87{,}5" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "85{,}0" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "82{,}5" },
            { kind: "text", text: " km/h" },
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
            { display: "block", kind: "math", math: "97.5" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "95.0" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "87.5" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "85.0" },
            { kind: "text", text: " km/h" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "82.5" },
            { kind: "text", text: " km/h" },
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
            { display: "block", kind: "math", math: "97{,}5" },
            { kind: "text", text: " km/jam" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "95{,}0" },
            { kind: "text", text: " km/jam" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "87{,}5" },
            { kind: "text", text: " km/jam" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "85{,}0" },
            { kind: "text", text: " km/jam" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "82{,}5" },
            { kind: "text", text: " km/jam" },
          ],
        },
      ],
    },
  },
};

export default item;
