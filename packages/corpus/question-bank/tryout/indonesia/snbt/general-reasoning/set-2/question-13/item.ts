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
              text: "Inlandsbeschaffung und Reisimporte werden als gegenläufig beschrieben",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Inlandsbeschaffung und Reisimporte werden als gleichläufig beschrieben",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Text beschreibt keinen Zusammenhang zwischen Inlandsbeschaffung und Reisimporten",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Inlandsbeschaffung und Reisexporte werden als gegenläufig beschrieben",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Lösung der Überarbeitung der Präsidialverordnung Nr. ",
            },
            { display: "block", kind: "math", math: "63" },
            { kind: "text", text: " von " },
            { display: "block", kind: "math", math: "2017" },
            { kind: "text", text: " wird die Budgetzuweisungen ändern" },
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
            {
              kind: "text",
              text: "Domestic procurement and rice imports are described as moving in opposite directions",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Domestic procurement and rice imports are described as moving in the same direction",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The passage describes no relationship between domestic procurement and rice imports",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Domestic procurement and rice exports are described as moving in opposite directions",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The solution of revising Presidential Regulation Number ",
            },
            { display: "block", kind: "math", math: "63" },
            { kind: "text", text: " of " },
            { display: "block", kind: "math", math: "2017" },
            { kind: "text", text: " will change budget allocations" },
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
            {
              kind: "text",
              text: "Serapan dalam negeri dan impor beras digambarkan bergerak berlawanan arah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Serapan dalam negeri dan impor beras digambarkan bergerak searah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bacaan tidak menggambarkan hubungan antara serapan dalam negeri dan impor beras",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Serapan dalam negeri dan ekspor beras digambarkan bergerak berlawanan arah",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Solusi merevisi Peraturan Presiden Nomor " },
            { display: "block", kind: "math", math: "63" },
            { kind: "text", text: " Tahun " },
            { display: "block", kind: "math", math: "2017" },
            { kind: "text", text: " akan mengubah alokasi anggaran" },
          ],
        },
      ],
    },
  },
};

export default item;
