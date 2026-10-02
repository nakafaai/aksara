import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kakinya *terinjak* saat menonton konser semalam.",
        },
        {
          isCorrect: false,
          label: "Arman menjadi siswa *terbaik* di kelas.",
        },
        {
          isCorrect: false,
          label: "Dia tidak sengaja *tertidur* di sofa semalam.",
        },
        {
          isCorrect: true,
          label: "Kayu-kayu balok itu *terikat* dengan kuat.",
        },
        {
          isCorrect: false,
          label: "Dian menjadi peserta *termuda* dalam acara tersebut.",
        },
      ],
    },
  },
};

export default item;
