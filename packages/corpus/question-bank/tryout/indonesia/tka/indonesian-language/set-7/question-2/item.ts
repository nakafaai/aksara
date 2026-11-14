import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "braille-signs",
  versions: {
    id: {
      columns: ["Hasil uji coba", "Masukan peserta", "Rencana pengelola"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Peserta meminta nama kota tujuan dicantumkan." },
        {
          column: 1,
          label: "Waktu pencarian turun menjadi sekitar empat menit.",
        },
        {
          column: 3,
          label: "Petugas dan pedagang akan diberi pelatihan singkat.",
        },
        {
          column: 2,
          label:
            "Semua papan diminta dipasang di sisi yang sama pada setiap jalur.",
        },
      ],
    },
  },
};

export default item;
