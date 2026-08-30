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
              text: "Basketball ist das beliebteste Freizeitinteresse",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Insgesamt interessieren sich " },
            { display: "block", kind: "math", math: "65" },
            { kind: "text", text: " Schülerinnen und Schüler für Schauspiel" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Gesamtzahl der Schülerinnen und Schüler in Klasse ",
            },
            { display: "block", kind: "math", math: "\\text{XII}" },
            { kind: "text", text: " beträgt " },
            { display: "block", kind: "math", math: "306" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "In Klasse " },
            { display: "block", kind: "math", math: "\\text{X}" },
            {
              kind: "text",
              text: " interessieren sich die wenigsten Schülerinnen und Schüler für Tanz",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Insgesamt interessieren sich " },
            { display: "block", kind: "math", math: "160" },
            { kind: "text", text: " Schülerinnen und Schüler für Malerei" },
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
            { kind: "text", text: "Basketball is the most popular interest" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The number of students interested in acting is ",
            },
            { display: "block", kind: "math", math: "65" },
            { kind: "text", text: " students" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The number of class " },
            { display: "block", kind: "math", math: "\\text{XII}" },
            { kind: "text", text: " students according to interest is " },
            { display: "block", kind: "math", math: "306" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "The least interest in dance is in class " },
            { display: "block", kind: "math", math: "\\text{X}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The number of students interested in painting is ",
            },
            { display: "block", kind: "math", math: "160" },
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
              text: "Kegemaran basket adalah paling banyak diminati",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jumlah siswa gemar seni peran adalah " },
            { display: "block", kind: "math", math: "65" },
            { kind: "text", text: " siswa" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Jumlah siswa kelas " },
            { display: "block", kind: "math", math: "\\text{XII}" },
            { kind: "text", text: " sesuai kegemaran adalah " },
            { display: "block", kind: "math", math: "306" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kegemaran seni tari yang paling sedikit ada di kelas ",
            },
            { display: "block", kind: "math", math: "\\text{X}" },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Jumlah siswa gemar melukis adalah " },
            { display: "block", kind: "math", math: "160" },
          ],
        },
      ],
    },
  },
};

export default item;
