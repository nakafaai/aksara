import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "subak-water",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Subak-subak yang berdekatan cenderung mulai menanam pada waktu yang sama.",
        },
        {
          column: 2,
          label:
            "Jadwal bertahap antara hulu dan hilir bertujuan agar semua subak membutuhkan air paling banyak pada saat yang sama.",
        },
        {
          column: 1,
          label:
            "Mengosongkan atau menggenangi sawah yang luas secara serentak setelah panen membantu menekan populasi hama.",
        },
        {
          column: 2,
          label:
            "Program peningkatan produksi pada tahun 1970-an membuat petani makin patuh pada jadwal pura.",
        },
      ],
    },
  },
};

export default item;
