import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Einwohner von Jakarta haben eine Geburtsurkunde und einen Personalausweis (KTP).",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Einwohner von Jakarta haben eine Geburtsurkunde oder einen Personalausweis (KTP).",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Es gibt Einwohner von Jakarta, die älter als ",
            },
            { display: "block", kind: "math", math: "17" },
            {
              kind: "text",
              text: " Jahre sind und keine Geburtsurkunde, aber einen Personalausweis (KTP) besitzen.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Einige Einwohner von Jakarta verfügen über eine Geburtsurkunde und einen Personalausweis (KTP).",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Einige Einwohner von Jakarta haben keine Geburtsurkunde, aber einen Personalausweis (KTP).",
            },
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
            {
              kind: "text",
              text: "All Jakarta residents have a birth certificate and ID card (KTP)",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "All Jakarta residents have a birth certificate or ID card (KTP)",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "There are Jakarta residents over " },
            { display: "block", kind: "math", math: "17" },
            {
              kind: "text",
              text: " years old who do not have a birth certificate but have an ID card (KTP)",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Some Jakarta residents have a birth certificate and ID card (KTP)",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Some Jakarta residents do not have a birth certificate but have an ID card (KTP)",
            },
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
            {
              kind: "text",
              text: "Semua warga Jakarta memiliki AKTA kelahiran dan KTP",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua warga Jakarta memiliki AKTA kelahiran atau KTP",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Ada warga Jakarta di atas " },
            { display: "block", kind: "math", math: "17" },
            {
              kind: "text",
              text: " tahun tidak memiliki AKTA kelahiran namun memiliki KTP",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sebagian warga Jakarta memiliki AKTA kelahiran dan KTP",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebagian warga Jakarta tidak memiliki AKTA kelahiran namun mempunyai KTP",
            },
          ],
        },
      ],
    },
  },
};

export default item;
