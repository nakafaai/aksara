import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "127" },
            { kind: "text", text: " Besucher" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "126" },
            { kind: "text", text: " Besucher" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "125" },
            { kind: "text", text: " Besucher" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "124" },
            { kind: "text", text: " Besucher" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "123" },
            { kind: "text", text: " Besucher" },
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
            { display: "block", kind: "math", math: "127" },
            { kind: "text", text: " visitors" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "126" },
            { kind: "text", text: " visitors" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "125" },
            { kind: "text", text: " visitors" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "124" },
            { kind: "text", text: " visitors" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "123" },
            { kind: "text", text: " visitors" },
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
            { display: "block", kind: "math", math: "127" },
            { kind: "text", text: " pengunjung" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "126" },
            { kind: "text", text: " pengunjung" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "125" },
            { kind: "text", text: " pengunjung" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "124" },
            { kind: "text", text: " pengunjung" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "123" },
            { kind: "text", text: " pengunjung" },
          ],
        },
      ],
    },
  },
};

export default item;
