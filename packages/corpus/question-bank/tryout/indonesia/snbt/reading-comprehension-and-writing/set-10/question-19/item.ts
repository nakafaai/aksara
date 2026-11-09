import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "running-club",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Kalimat (5) menjelaskan penyebab berkurangnya anggota yang ikut latihan pada bulan April.",
        },
        {
          correct: false,
          label:
            "Kalimat (5) menjelaskan penyebab membaiknya waktu anggota pada bulan April.",
        },
        {
          correct: false,
          label: "Kalimat (5) membantah data bulan April pada tabel.",
        },
        {
          correct: false,
          label: "Kalimat (5) menyebut rencana klub mengikuti lomba.",
        },
        {
          correct: false,
          label: "Kalimat (5) memberi contoh anggota yang paling cepat.",
        },
      ],
    },
  },
};

export default item;
