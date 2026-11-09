import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "artefact-return",
  versions: {
    id: {
      columns: ["Teks 1", "Teks 2"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Benda-benda itu diambil dengan kekerasan pada masa penjajahan.",
        },
        {
          column: 2,
          label:
            "Benda kuno memerlukan ruang dengan suhu dan kelembapan yang stabil.",
        },
        {
          column: 1,
          label:
            "Makna benda itu paling dalam bagi masyarakat yang membuatnya.",
        },
        {
          column: 1,
          label:
            "Museum di Indonesia kini sudah mampu merawat benda-benda itu.",
        },
      ],
    },
  },
};

export default item;
