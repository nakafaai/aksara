import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "garam",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Bakteri yang tidak terbunuh oleh garam berhenti tumbuh selama ikan asin tetap kering.",
        },
        {
          column: 1,
          label:
            "Berkurangnya air bebas di dalam daging tidak hanya disebabkan oleh air yang keluar dari sel.",
        },
        {
          column: 1,
          label:
            "Garam tetap dapat masuk ke dalam daging walaupun air sedang bergerak keluar dari sel.",
        },
        {
          column: 2,
          label:
            "Ikan dijemur agar garam lebih cepat meresap ke bagian tengah daging.",
        },
      ],
    },
  },
};

export default item;
