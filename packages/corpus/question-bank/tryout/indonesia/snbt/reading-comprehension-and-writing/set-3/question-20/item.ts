import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "night-watch",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ronda malam adalah satu-satunya penyebab turunnya laporan pencurian di RW 05.",
        },
        {
          correct: false,
          label: "Lampu jalan yang lebih terang adalah satu-satunya penyebab turunnya laporan pencurian di RW 05.",
        },
        {
          correct: false,
          label: "Jadwal ronda yang dibagikan melalui grup pesan membuat laporan pencurian bertambah.",
        },
        {
          correct: true,
          label: "Laporan pencurian turun seiring bertambahnya warga yang ikut ronda, tetapi lampu jalan yang lebih terang juga mungkin ikut berpengaruh.",
        },
        {
          correct: false,
          label: "Laporan pencurian di RW 05 akan habis sama sekali pada akhir tahun.",
        },
      ],
    },
  },
};

export default item;
