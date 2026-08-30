import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "das Wort *gewann* im Satz " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "das Wort *datiert* im Satz " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "das Wort *Proben* im Satz " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "das Wort *Forschung* im Satz " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "das Wort *zirkulierten* im Satz " },
            { display: "block", kind: "math", math: "(8)" },
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
            { kind: "text", text: "the word *recovered* in sentence " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "the word *date* in sentence " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "the word *samples* in sentence " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "the word *research* in sentence " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "the word *circulated* in sentence " },
            { display: "block", kind: "math", math: "(8)" },
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
            { kind: "text", text: "kata *menemukan* pada kalimat " },
            { display: "block", kind: "math", math: "(3)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kata *hidup* pada kalimat " },
            { display: "block", kind: "math", math: "(4)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kata *sampel* pada kalimat " },
            { display: "block", kind: "math", math: "(5)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "kata *penelitian* pada kalimat " },
            { display: "block", kind: "math", math: "(6)" },
            { kind: "text", text: "." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "kata *beredar* pada kalimat " },
            { display: "block", kind: "math", math: "(8)" },
            { kind: "text", text: "." },
          ],
        },
      ],
    },
  },
};

export default item;
