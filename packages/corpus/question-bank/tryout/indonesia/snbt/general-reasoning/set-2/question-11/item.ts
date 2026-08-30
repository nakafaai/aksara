import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}1" },
            { kind: "text", text: " Millionen Tonnen" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1{,}8" },
            { kind: "text", text: " Millionen Tonnen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2{,}5" },
            { kind: "text", text: " Millionen Tonnen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3{,}0" },
            { kind: "text", text: " Millionen Tonnen" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kann nicht bestimmt werden" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1.1" },
            { kind: "text", text: " million tons" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1.8" },
            { kind: "text", text: " million tons" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2.5" },
            { kind: "text", text: " million tons" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3.0" },
            { kind: "text", text: " million tons" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Cannot be determined" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1{,}1" },
            { kind: "text", text: " juta ton" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1{,}8" },
            { kind: "text", text: " juta ton" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2{,}5" },
            { kind: "text", text: " juta ton" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "3{,}0" },
            { kind: "text", text: " juta ton" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tidak dapat ditentukan" }],
        },
      ],
    },
  },
};

export default item;
