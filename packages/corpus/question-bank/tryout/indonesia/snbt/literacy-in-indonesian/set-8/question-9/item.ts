import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sore itu, koran yang tersisa lebih dari dua pertiga dari koran yang dibawa Pak Harun hari itu.",
        },
        {
          column: 2,
          label:
            "Pak Darto adalah satu-satunya pembeli koran di lapak Pak Harun hari itu.",
        },
        {
          column: 1,
          label:
            "Sesudah Pagi Raya berhenti terbit, judul koran di lapak itu tinggal seperenam dari jumlah judul koran yang dulu dijual.",
        },
        {
          column: 2,
          label: "Bu Sri mendengar kabar berhentinya Pagi Raya dari Pak Harun.",
        },
        {
          column: 2,
          label: "Lapak Pak Harun kini hanya menjual koran.",
        },
      ],
    },
  },
};

export default item;
