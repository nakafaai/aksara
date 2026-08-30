import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Der Definitionsbereich von " },
            { display: "inline", kind: "math", math: "f" },
            { kind: "text", text: " enthält " },
            { display: "inline", kind: "math", math: "x=1" },
            { kind: "text", text: " nicht." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "inline", kind: "math", math: "f(0)=-3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Der Wertebereich von " },
            { display: "inline", kind: "math", math: "f" },
            { kind: "text", text: " enthält " },
            { display: "inline", kind: "math", math: "y=2" },
            { kind: "text", text: " nicht." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Die Umkehrfunktion lautet " },
            {
              display: "inline",
              kind: "math",
              math: "f^{-1}(x)=\\frac{x+3}{x-2}",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "inline", kind: "math", math: "f(1)=0" },
            { kind: "text", text: "." },
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
            { kind: "text", text: "The domain of " },
            { display: "inline", kind: "math", math: "f" },
            { kind: "text", text: " excludes " },
            { display: "inline", kind: "math", math: "x=1" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "inline", kind: "math", math: "f(0)=-3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "The range of " },
            { display: "inline", kind: "math", math: "f" },
            { kind: "text", text: " excludes " },
            { display: "inline", kind: "math", math: "y=2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Its inverse is " },
            {
              display: "inline",
              kind: "math",
              math: "f^{-1}(x)=\\frac{x+3}{x-2}",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "inline", kind: "math", math: "f(1)=0" },
            { kind: "text", text: "." },
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
            { kind: "text", text: "Domain " },
            { display: "inline", kind: "math", math: "f" },
            { kind: "text", text: " mengecualikan " },
            { display: "inline", kind: "math", math: "x=1" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "inline", kind: "math", math: "f(0)=-3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Range " },
            { display: "inline", kind: "math", math: "f" },
            { kind: "text", text: " mengecualikan " },
            { display: "inline", kind: "math", math: "y=2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Inversnya adalah " },
            {
              display: "inline",
              kind: "math",
              math: "f^{-1}(x)=\\frac{x+3}{x-2}",
            },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { display: "inline", kind: "math", math: "f(1)=0" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
