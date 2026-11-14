import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "mini-bank",
  versions: {
    id: {
      columns: [
        "Cara kerja bank mini",
        "Perkembangan dan masalah",
        "Upaya perbaikan",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Uang disetorkan ke bank daerah setiap akhir pekan.",
        },
        { column: 2, label: "Penabung naik dari 210 menjadi 360 siswa." },
        {
          column: 3,
          label:
            "Siswa yang menabung paling sedikit 20 kali mendapat sertifikat.",
        },
        { column: 2, label: "Setoran turun pada bulan-bulan akhir semester." },
      ],
    },
  },
};

export default item;
