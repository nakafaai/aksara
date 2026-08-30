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
              text: "Die Basketballbeteiligung steigt in jeder Jahrgangsstufe",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tanz hat in jeder Jahrgangsstufe weniger Teilnehmende als Gesang",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Beteiligung am Malen steigt in jeder Jahrgangsstufe",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In jeder Klassenstufe ist Singen das am wenigsten beliebte Hobby",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Schauspiel hat in jeder Jahrgangsstufe die wenigsten Teilnehmenden",
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
              text: "Basketball participation increases at every grade level",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dance has fewer participants than singing in every grade",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Painting participation increases at every grade level",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "In every grade level, singing is the least popular hobby",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Acting is the least popular among students because it always has the fewest participants at every level",
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
              text: "Jumlah peminat basket meningkat pada setiap jenjang kelas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Peminat seni tari lebih sedikit daripada menyanyi di setiap kelas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jumlah peminat melukis meningkat pada setiap jenjang kelas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Di setiap jenjang kelas, menyanyi menjadi kegemaran yang paling sedikit peminatnya",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
            },
          ],
        },
      ],
    },
  },
};

export default item;
