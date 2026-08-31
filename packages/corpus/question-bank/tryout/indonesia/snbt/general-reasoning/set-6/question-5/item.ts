import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Basketballbeteiligung steigt in jeder Jahrgangsstufe",
        },
        {
          isCorrect: false,
          label:
            "Tanz hat in jeder Jahrgangsstufe weniger Teilnehmende als Gesang",
        },
        {
          isCorrect: false,
          label: "Die Beteiligung am Malen steigt in jeder Jahrgangsstufe",
        },
        {
          isCorrect: true,
          label:
            "Schauspiel hat in jeder Jahrgangsstufe die wenigsten Teilnehmenden",
        },
        {
          isCorrect: false,
          label:
            "In jeder Klassenstufe ist Singen das am wenigsten beliebte Hobby",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Basketball participation increases at every grade level",
        },
        {
          isCorrect: false,
          label: "Dance has fewer participants than singing in every grade",
        },
        {
          isCorrect: false,
          label: "Painting participation increases at every grade level",
        },
        {
          isCorrect: true,
          label:
            "Acting is the least popular among students because it always has the fewest participants at every level",
        },
        {
          isCorrect: false,
          label: "In every grade level, singing is the least popular hobby",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Jumlah peminat basket meningkat pada setiap jenjang kelas",
        },
        {
          isCorrect: false,
          label:
            "Peminat seni tari lebih sedikit daripada menyanyi di setiap kelas",
        },
        {
          isCorrect: false,
          label: "Jumlah peminat melukis meningkat pada setiap jenjang kelas",
        },
        {
          isCorrect: true,
          label:
            "Seni peran paling tidak diminati siswa karena pesertanya selalu paling sedikit pada setiap jenjangnya",
        },
        {
          isCorrect: false,
          label:
            "Di setiap jenjang kelas, menyanyi menjadi kegemaran yang paling sedikit peminatnya",
        },
      ],
    },
  },
};

export default item;
