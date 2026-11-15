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
        { column: 1, label: "Kenaikan penjualan pada 2022 sudah cukup untuk menunjukkan bahwa kenaikan upah menguntungkan usaha kecil." },
        { column: 2, label: "Hasil penelitian tentang perusahaan besar tidak dapat langsung dipakai untuk memperkirakan nasib sebuah toko roti." },
        { column: 1, label: "Keberatan pengusaha tidak perlu ditunggu sebelum dewan pengupahan mengambil keputusan." },
        { column: 2, label: "Angka penjualan 2022 belum dapat memisahkan pengaruh kenaikan upah dari pengaruh pulihnya kegiatan ekonomi." },
        { column: 2, label: "Kelonggaran waktu bagi usaha mikro tidak boleh menghapus kenaikan upah bagi pekerjanya." },
      ],
    },
  },
};

export default item;
