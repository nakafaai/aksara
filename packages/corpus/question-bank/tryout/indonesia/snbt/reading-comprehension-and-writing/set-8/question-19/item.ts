import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "minibus-schedule",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kalimat (2) menyebut akibat dari jadwal tetap.",
        },
        {
          correct: false,
          label: "Kalimat (2) membantah isi kalimat (1).",
        },
        {
          correct: false,
          label: "Kalimat (2) memberi contoh penumpang yang menunggu.",
        },
        {
          correct: true,
          label:
            "Kalimat (2) menjelaskan keadaan sebelum perubahan yang disebut dalam kalimat (1).",
        },
        {
          correct: false,
          label: "Kalimat (2) menyimpulkan isi tabel.",
        },
      ],
    },
  },
};

export default item;
