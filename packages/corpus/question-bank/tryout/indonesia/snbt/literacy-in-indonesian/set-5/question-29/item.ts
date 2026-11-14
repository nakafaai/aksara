import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "growth-mindset",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dalam studi nasional itu, jarak nilai antara siswa berprestasi rendah dan siswa berprestasi tinggi menyempit setelah intervensi.",
        },
        {
          column: 2,
          label:
            "Efek rata-rata yang kecil berarti setiap siswa memperoleh manfaat yang sama kecilnya.",
        },
        {
          column: 2,
          label:
            "Intervensi itu akan memberi manfaat yang lebih besar jika diberikan dalam lebih banyak sesi.",
        },
        {
          column: 1,
          label:
            "Lingkungan sekolah ikut menentukan besar manfaat yang diperoleh siswa dari intervensi itu.",
        },
      ],
    },
  },
};

export default item;
