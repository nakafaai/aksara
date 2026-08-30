import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Wort _untersuchten_ in Satz " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Wort _begünstigen_ in Satz " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Wort _lässt_ in Satz " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Das Wort _erzeugen_ in Satz " },
            { display: "block", kind: "math", math: "(8)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Wort _bedrohen_ in Satz " },
            { display: "block", kind: "math", math: "(9)" },
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
            { kind: "text", text: "The word _tested_ in sentence " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The word _facilitate_ in sentence " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The word _allows_ in sentence " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "The word _produce_ in sentence " },
            { display: "block", kind: "math", math: "(8)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The word _threaten_ in sentence " },
            { display: "block", kind: "math", math: "(9)" },
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
            { kind: "text", text: "Kata _diuji_ pada kalimat " },
            { display: "block", kind: "math", math: "(2)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kata _membantu_ pada kalimat " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kata _memungkinkan_ pada kalimat " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Kata _menghasilkan_ pada kalimat " },
            { display: "block", kind: "math", math: "(8)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kata _mengancam_ pada kalimat " },
            { display: "block", kind: "math", math: "(9)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
