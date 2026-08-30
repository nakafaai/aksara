import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "145" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "62" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "62" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "145" },
            { kind: "text", text: " Personen" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "65" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " Personen" },
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
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "145" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "62" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "62" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "145" },
            { kind: "text", text: " people" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "65" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " people" },
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
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "60" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "145" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "62" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "62" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "145" },
            { kind: "text", text: " orang" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "65" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "155" },
            { kind: "text", text: " orang" },
          ],
        },
      ],
    },
  },
};

export default item;
