import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Das Wachstum lag in jedem genannten Jahr über ",
            },
            { display: "block", kind: "math", math: "5%" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Ab " },
            { display: "block", kind: "math", math: "2016" },
            {
              kind: "text",
              text: " verbesserte sich das Wirtschaftswachstum wieder",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das BIP betrug " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " " },
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }14{.}837{,}4\\text{ Billionen}",
            },
            { kind: "text", text: " und das BIP pro Kopf rund " },
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }56\\text{ Millionen}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das niedrigste genannte Wachstum betrug " },
            { display: "block", kind: "math", math: "4{,}88%" },
            { kind: "text", text: " im Jahr " },
            { display: "block", kind: "math", math: "2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Das Wirtschaftswachstum betrug " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " " },
            { display: "block", kind: "math", math: "5{,}17%" },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Growth remained above " },
            { display: "block", kind: "math", math: "5%" },
            { kind: "text", text: " in every year mentioned" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Economic growth began improving again in " },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "GDP in " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " was " },
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }14{,}837.4\\text{ trillion}",
            },
            { kind: "text", text: " and GDP per capita was about " },
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }56\\text{ million}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The lowest stated growth was " },
            { display: "block", kind: "math", math: "4.88%" },
            { kind: "text", text: " in " },
            { display: "block", kind: "math", math: "2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Economic growth in " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " was " },
            { display: "block", kind: "math", math: "5.17%" },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Pertumbuhan tetap di atas " },
            { display: "block", kind: "math", math: "5%" },
            { kind: "text", text: " pada setiap tahun yang disebutkan" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pertumbuhan ekonomi mulai membaik kembali pada ",
            },
            { display: "block", kind: "math", math: "2016" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "PDB pada " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " sebesar " },
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }14{.}837{,}4\\text{ triliun}",
            },
            { kind: "text", text: " dan PDB per kapita sekitar " },
            {
              display: "block",
              kind: "math",
              math: "\\text{Rp }56\\text{ juta}",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pertumbuhan terendah yang disebutkan adalah ",
            },
            { display: "block", kind: "math", math: "4{,}88%" },
            { kind: "text", text: " pada " },
            { display: "block", kind: "math", math: "2015" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pertumbuhan ekonomi pada " },
            { display: "block", kind: "math", math: "2018" },
            { kind: "text", text: " sebesar " },
            { display: "block", kind: "math", math: "5{,}17%" },
          ],
        },
      ],
    },
  },
};

export default item;
