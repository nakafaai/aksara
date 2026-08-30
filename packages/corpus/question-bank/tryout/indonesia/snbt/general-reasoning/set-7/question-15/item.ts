import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Alle " },
            { display: "block", kind: "math", math: "120" },
            {
              kind: "text",
              text: " Tomatensetzlinge überlebten den ersten Monat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Alle " },
            { display: "block", kind: "math", math: "96" },
            {
              kind: "text",
              text: " überlebenden Setzlinge bildeten neue Blätter.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Der Bericht bewies, dass die überlebenden Setzlinge krankheitsfrei waren.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "72" },
            {
              kind: "text",
              text: " der überlebenden Setzlinge bildeten neue Blätter.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die überlebenden Setzlinge trugen mehr Früchte als die übrigen.",
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
            { kind: "text", text: "All " },
            { display: "block", kind: "math", math: "120" },
            {
              kind: "text",
              text: " tomato seedlings survived the first month.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "All " },
            { display: "block", kind: "math", math: "96" },
            { kind: "text", text: " surviving seedlings produced new leaves." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The report proved that the surviving seedlings were disease-free.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { display: "block", kind: "math", math: "72" },
            {
              kind: "text",
              text: " of the surviving seedlings produced new leaves.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The surviving seedlings produced more fruit than the others.",
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
            { kind: "text", text: "Seluruh " },
            { display: "block", kind: "math", math: "120" },
            {
              kind: "text",
              text: " bibit tomat bertahan hidup selama bulan pertama.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Seluruh " },
            { display: "block", kind: "math", math: "96" },
            {
              kind: "text",
              text: " bibit yang bertahan hidup menghasilkan daun baru.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Laporan membuktikan bahwa bibit yang bertahan bebas dari penyakit.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Sebanyak " },
            { display: "block", kind: "math", math: "72" },
            {
              kind: "text",
              text: " bibit yang bertahan hidup menghasilkan daun baru.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bibit yang bertahan menghasilkan lebih banyak buah daripada bibit lainnya.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
