import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "inline", kind: "math", math: "\\sqrt{3^2}=3" },
            { kind: "text", text: ", da " },
            { display: "inline", kind: "math", math: "3>0" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "inline", kind: "math", math: "(-3)^2=3^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "inline", kind: "math", math: "3^{-1}=-3" }],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "inline",
              kind: "math",
              math: "3^{\\frac12}\\cdot 3^{\\frac12}=3",
            },
          ],
        },
      ],
    },
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "inline", kind: "math", math: "\\sqrt{3^2}=3" },
            { kind: "text", text: " because " },
            { display: "inline", kind: "math", math: "3>0" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "inline", kind: "math", math: "(-3)^2=3^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "inline", kind: "math", math: "3^{-1}=-3" }],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "inline",
              kind: "math",
              math: "3^{\\frac12}\\cdot 3^{\\frac12}=3",
            },
          ],
        },
      ],
    },
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { display: "inline", kind: "math", math: "\\sqrt{3^2}=3" },
            { kind: "text", text: " untuk " },
            { display: "inline", kind: "math", math: "3>0" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "inline", kind: "math", math: "(-3)^2=3^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "inline", kind: "math", math: "3^{-1}=-3" }],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "inline",
              kind: "math",
              math: "3^{\\frac12}\\cdot 3^{\\frac12}=3",
            },
          ],
        },
      ],
    },
  },
};

export default item;
