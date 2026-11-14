import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "tenun",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kalimat (3) diubah menjadi *Setelah ditenun selama berminggu-minggu, barulah selendang buatan peserta terlihat utuh.*",
        },
        {
          column: 2,
          label:
            "Kalimat (3) diubah menjadi *Setelah menenun selama berminggu-minggu, barulah selendang buatan peserta terlihat utuh.*",
        },
        {
          column: 2,
          label:
            "Kalimat (6) diubah menjadi *Peserta baru kini memulai dengan menenun pembatas buku, lalu menenun taplak kecil, sehingga dapat menenun selendang pada bulan keenam.*",
        },
        {
          column: 1,
          label:
            "Kalimat (6) diubah menjadi *Peserta baru kini memulai dengan menenun pembatas buku, lalu menenun taplak kecil, dan baru menenun selendang pada bulan keenam.*",
        },
      ],
    },
  },
};

export default item;
