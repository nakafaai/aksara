import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kakinya *terinjak* saat menonton konser semalam.",
        },
        {
          correct: false,
          label: "Arman menjadi siswa *terbaik* di kelas.",
        },
        {
          correct: false,
          label: "Dia tidak sengaja *tertidur* di sofa semalam.",
        },
        {
          correct: true,
          label: "Kayu-kayu balok itu *terikat* dengan kuat.",
        },
        {
          correct: false,
          label: "Dian menjadi peserta *termuda* dalam acara tersebut.",
        },
      ],
    },
  },
};

export default item;
