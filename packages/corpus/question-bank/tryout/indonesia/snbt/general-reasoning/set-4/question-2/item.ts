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
            { kind: "text", text: " Teddybären" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " Murmeln" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Ball und " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Barbie-Puppe" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Barbie-Puppe und " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Murmel" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Teddybär und " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Ball" },
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
            { kind: "text", text: " teddy bears" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " marbles" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " ball and " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Barbie doll" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " Barbie doll and " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " marble" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " teddy bear and " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " ball" },
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
            { kind: "text", text: " boneka beruang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "2" },
            { kind: "text", text: " kelereng" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " bola dan " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " boneka Barbie" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " boneka Barbie dan " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " kelereng" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " boneka beruang dan " },
            { display: "block", kind: "math", math: "1" },
            { kind: "text", text: " bola" },
          ],
        },
      ],
    },
  },
};

export default item;
