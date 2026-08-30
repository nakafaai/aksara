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
            { display: "inline", kind: "math", math: "\\sqrt{5^2}=5" },
            { kind: "text", text: ", da " },
            { display: "inline", kind: "math", math: "5>0" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "inline", kind: "math", math: "(-5)^2=5^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "inline", kind: "math", math: "5^{-1}=-5" }],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "inline",
              kind: "math",
              math: "5^{\\frac12}\\cdot 5^{\\frac12}=5",
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
            { display: "inline", kind: "math", math: "\\sqrt{5^2}=5" },
            { kind: "text", text: " because " },
            { display: "inline", kind: "math", math: "5>0" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "inline", kind: "math", math: "(-5)^2=5^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "inline", kind: "math", math: "5^{-1}=-5" }],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "inline",
              kind: "math",
              math: "5^{\\frac12}\\cdot 5^{\\frac12}=5",
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
            { display: "inline", kind: "math", math: "\\sqrt{5^2}=5" },
            { kind: "text", text: " untuk " },
            { display: "inline", kind: "math", math: "5>0" },
          ],
        },
        {
          isCorrect: true,
          label: [{ display: "inline", kind: "math", math: "(-5)^2=5^2" }],
        },
        {
          isCorrect: false,
          label: [{ display: "inline", kind: "math", math: "5^{-1}=-5" }],
        },
        {
          isCorrect: true,
          label: [
            {
              display: "inline",
              kind: "math",
              math: "5^{\\frac12}\\cdot 5^{\\frac12}=5",
            },
          ],
        },
      ],
    },
  },
};

export default item;
