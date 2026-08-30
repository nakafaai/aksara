import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "NUR " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " sind wahr" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "NUR " },
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " sind wahr" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "NUR " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " und " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " sind wahr" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Nur " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " ist wahr" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ALLE Aussagen sind wahr" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ", and " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " ONLY are true" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " ONLY are true" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " and " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " ONLY are true" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " ONLY is true" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ALL statements are true" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: ", " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: ", dan " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " SAJA yang benar" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(1)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: " SAJA yang benar" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: " dan " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " SAJA yang benar" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: " SAJA yang benar" },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "SEMUA pernyataan benar" }],
        },
      ],
    },
  },
};

export default item;
