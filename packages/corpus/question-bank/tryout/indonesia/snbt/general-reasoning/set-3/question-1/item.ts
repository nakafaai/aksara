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
              text: "Das Interesse am Basketball steigt mit jeder Klassenstufe",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tanz hat beste Aussichten, weil das Interesse immer größer wird",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Malerei hat beste Aussichten, da das Interesse immer größer wird",
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
              text: "Schauspiel ist bei den Schülern am wenigsten beliebt, da es in jeder Jahrgangsstufe immer die wenigsten Teilnehmer gibt",
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
              text: "Interest in basketball increases at every grade level",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Dance has the best prospects because interest is always increasing",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Painting has the best prospects because interest is always increasing",
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
              text: "Acting is the least popular among students because it always has the fewest participants in every grade",
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
              text: "Peminat bola basket meningkat pada setiap jenjang kelas",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Seni tari memiliki prospek paling baik karena peminatnya selalu meningkat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Seni lukis memiliki prospek paling baik karena peminatnya selalu meningkat",
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
