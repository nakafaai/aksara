import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "street-vendors",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kedua penulis setuju bahwa trotoar seharusnya dapat dilalui pejalan kaki dengan aman.",
        },
        {
          column: 1,
          label:
            "Teks B menyiratkan bahwa letak lokasi baru lebih menentukan daripada mutu bangunannya.",
        },
        {
          column: 2,
          label:
            "Menurut Teks A, pedagang wajib membayar sewa lapak sejak bulan pertama.",
        },
        {
          column: 1,
          label:
            "Menurut survei Teks B, lebih dari separuh pedagang yang dipindahkan pada 2022 kembali ke jalan dalam setahun.",
        },
        {
          column: 2,
          label:
            "Penulis Teks B menolak penataan pedagang kaki lima dalam bentuk apa pun.",
        },
      ],
    },
  },
};

export default item;
