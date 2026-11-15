import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "minimum-wage",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Upah minimum yang berlaku sekarang perlu dinaikkan.",
        },
        {
          column: 2,
          label:
            "Kenaikan penjualan pasar pada 2022 menunjukkan bahwa kenaikan upah menguntungkan usaha kecil.",
        },
        {
          column: 2,
          label:
            "Usaha besar dan usaha mikro sebaiknya menaikkan upah dengan besar dan jadwal yang sama.",
        },
        {
          column: 1,
          label:
            "Pekerja usaha mikro pada akhirnya tetap harus menerima kenaikan upah, walaupun lebih lambat.",
        },
        {
          column: 2,
          label:
            "Hasil penelitian tentang perusahaan besar dapat langsung dipakai untuk memperkirakan dampak kenaikan upah pada usaha mikro.",
        },
      ],
    },
  },
};

export default item;
