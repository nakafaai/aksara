import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "achtundvierzig-Komma-drei-fünf-Prozent." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "48{,}35\\,\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48{,}35\\text{-}\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48{,}35" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4835\\,\\%" },
            { kind: "text", text: "." },
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
            { kind: "text", text: "forty-eight-point-three-five-percent." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "48.35\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48.35\\text{-}\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48.35" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4835\\%" },
            { kind: "text", text: "." },
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
            {
              kind: "text",
              text: "empat-puluh-delapan-koma-tiga-lima-persen.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "48{,}35\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48{,}35\\text{-}\\%" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "48{,}35" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "4835\\%" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
