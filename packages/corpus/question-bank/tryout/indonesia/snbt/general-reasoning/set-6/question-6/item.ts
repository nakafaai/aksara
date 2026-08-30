import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Basketball ist das beliebteste Hobby" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Insgesamt interessieren sich " },
            { display: "block", kind: "math", math: "65" },
            { kind: "text", text: " Schüler für Schauspiel" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Die Gesamtzahl in Klasse XII beträgt " },
            { display: "block", kind: "math", math: "306" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tanz hat in Klasse X die wenigsten Teilnehmenden",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Insgesamt interessieren sich " },
            { display: "block", kind: "math", math: "160" },
            { kind: "text", text: " Schüler für Malen" },
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
            { kind: "text", text: "Basketball is the most popular hobby" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The number of students who like acting is ",
            },
            { display: "block", kind: "math", math: "65" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The total number of Grade XII students based on hobbies is ",
            },
            { display: "block", kind: "math", math: "306" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The lowest interest in dance is in Grade X",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The number of students who like painting is ",
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
            {
              kind: "text",
              text: "Jumlah siswa kelas XII sesuai kegemaran adalah ",
            },
            { display: "block", kind: "math", math: "306" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kegemaran seni tari yang paling sedikit ada di kelas X",
            },
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
