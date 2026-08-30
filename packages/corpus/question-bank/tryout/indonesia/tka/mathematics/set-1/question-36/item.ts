import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  responses: {
    de: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Das arithmetische Mittel ist " },
            { display: "inline", kind: "math", math: "3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Der Median ist " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Der Modalwert ist " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Spannweite ist " },
            { display: "inline", kind: "math", math: "4" },
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
            { kind: "text", text: "The mean is " },
            { display: "inline", kind: "math", math: "3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "The median is " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "The mode is " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The range is " },
            { display: "inline", kind: "math", math: "4" },
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
            { kind: "text", text: "Rata-ratanya " },
            { display: "inline", kind: "math", math: "3" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Mediannya " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Modusnya " },
            { display: "inline", kind: "math", math: "2" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jangkauannya " },
            { display: "inline", kind: "math", math: "4" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
