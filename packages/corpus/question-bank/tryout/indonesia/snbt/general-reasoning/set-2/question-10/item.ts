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
            { kind: "text", text: " große Äpfel" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " kleine Äpfel" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " große Orangen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " kleine Orangen" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " großer Apfel und " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " kleine Orange" },
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
            { kind: "text", text: " large apples" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " small apples" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " large oranges" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " small oranges" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " large apple and " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " small orange" },
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
            { kind: "text", text: " apel besar" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " apel kecil" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " jeruk besar" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " jeruk kecil" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " apel besar dan " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " jeruk kecil" },
          ],
        },
      ],
    },
  },
};

export default item;
