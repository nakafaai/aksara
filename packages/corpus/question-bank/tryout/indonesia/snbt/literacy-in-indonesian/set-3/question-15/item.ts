import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "online-loan",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Banyak peminjam pinjaman daring akhirnya kesulitan membayar kembali pinjamannya.",
        },
        {
          column: 2,
          label:
            "Pengawasan terhadap aplikasi pinjaman daring perlu diperketat.",
        },
        {
          column: 1,
          label: "Pemahaman warga tentang biaya pinjaman tetap berguna.",
        },
        {
          column: 2,
          label:
            "Rendahnya literasi keuangan warga adalah akar masalah pinjaman daring.",
        },
      ],
    },
  },
};

export default item;
