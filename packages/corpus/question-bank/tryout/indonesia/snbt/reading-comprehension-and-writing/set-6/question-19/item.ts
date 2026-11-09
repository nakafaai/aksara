import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "bike-parking",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (5) menjelaskan penyebab bertambahnya siswa yang bersepeda.",
        },
        {
          correct: true,
          label:
            "Kalimat (5) menyebut akibat dari bertambahnya siswa bersepeda yang terlihat pada tabel.",
        },
        {
          correct: false,
          label: "Kalimat (5) membantah data pada tabel.",
        },
        {
          correct: false,
          label: "Kalimat (5) memberi contoh siswa yang diantar sepeda motor.",
        },
        {
          correct: false,
          label: "Kalimat (5) menyebut rencana dinas pendidikan.",
        },
      ],
    },
  },
};

export default item;
