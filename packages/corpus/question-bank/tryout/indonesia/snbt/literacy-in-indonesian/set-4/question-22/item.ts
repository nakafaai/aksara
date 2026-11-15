import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Komisi pemilih bacaan bekerja sekitar sembilan tahun sebelum diubah menjadi kantor penerbitan.",
        },
        {
          column: 2,
          label:
            "Semua buku terbitan Balai Pustaka ditulis dalam bahasa Melayu.",
        },
        {
          column: 1,
          label:
            "Naskah Salah Asuhan tidak terbit persis seperti yang semula diserahkan penulisnya.",
        },
        {
          column: 2,
          label:
            "Para penulis pergerakan menyebut karya mereka sendiri sebagai bacaan liar.",
        },
        {
          column: 2,
          label:
            "Nota Rinkes secara tertulis melarang semua kritik terhadap pemerintah kolonial.",
        },
      ],
    },
  },
};

export default item;
