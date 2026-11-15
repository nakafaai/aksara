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
      columns: ["Teks A", "Teks B"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Kenaikan penjualan pasar pada 2022 menunjukkan manfaat kenaikan upah minimum." },
        { column: 2, label: "Hasil penelitian di negara lain belum tentu berlaku bagi usaha yang hanya punya beberapa pekerja." },
        { column: 1, label: "Keberatan pengusaha tidak perlu menunda keputusan karena keberatan itu selalu muncul tanpa bukti." },
        { column: 2, label: "Kenaikan penjualan pada 2022 bisa jadi berasal dari pulihnya kegiatan ekonomi setelah pandemi." },
        { column: 2, label: "Besar dan kecepatan kenaikan upah sebaiknya dibedakan menurut ukuran usaha." },
      ],
    },
  },
};

export default item;
