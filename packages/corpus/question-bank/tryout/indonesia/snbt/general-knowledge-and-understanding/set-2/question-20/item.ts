import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "gang",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pengalaman program perbaikan kampung di Jakarta menunjukkan bahwa perbaikan akan bertahan bila warga ikut menentukan bagian yang dibenahi lebih dulu.",
        },
        {
          column: 1,
          label:
            "Jumlah penduduk sebuah kota dapat bertambah meskipun tidak ada seorang pun yang pindah dari desa ke kota itu.",
        },
        {
          column: 1,
          label:
            "Warga yang menjalankan usaha dari rumahnya di kampung kota dapat dirugikan oleh penggusuran meskipun mereka mendapat tempat tinggal baru.",
        },
        {
          column: 2,
          label:
            "Program perbaikan kampung di Jakarta membenahi kampung dengan memindahkan warganya ke rumah susun.",
        },
      ],
    },
  },
};

export default item;
