import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "car-free-day",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kedua teks mengakui bahwa ada pedagang yang memperoleh manfaat dari hari bebas kendaraan.",
        },
        {
          column: 2,
          label:
            "Teks 1 menyertakan hasil pengukuran kualitas udara di jalan-jalan sekitar Jalan Merdeka.",
        },
        {
          column: 2,
          label: "Teks 2 menolak seluruh gagasan hari bebas kendaraan.",
        },
        {
          column: 1,
          label:
            "Teks 2 mengusulkan pengaturan waktu bongkar muat barang bagi toko di sekitar area.",
        },
      ],
    },
  },
};

export default item;
