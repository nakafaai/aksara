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
            "Penjualan koran di lapak Pak Harun menurun dari waktu ke waktu.",
        },
        {
          column: 1,
          label:
            "Pak Darto membeli koran bukan terutama untuk membaca beritanya.",
        },
        {
          column: 2,
          label:
            "Sopir bus muda membeli koran untuk membandingkannya dengan berita di ponselnya.",
        },
        {
          column: 1,
          label: "Koran Pagi Raya akan berhenti terbit dalam beberapa minggu.",
        },
      ],
    },
  },
};

export default item;
