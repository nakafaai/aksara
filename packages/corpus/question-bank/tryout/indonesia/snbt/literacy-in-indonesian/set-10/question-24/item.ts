import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "lingua-franca",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bahasa Melayu sudah ditulis lebih dari dua belas abad sebelum Sumpah Pemuda.",
        },
        {
          column: 1,
          label:
            "Menurut teks, pemerintah kolonial ikut memakai bahasa Melayu di luar perdagangan.",
        },
        {
          column: 2,
          label:
            "Teks menyebut jumlah pasti penutur asli bahasa Jawa pada 1928.",
        },
        {
          column: 2,
          label:
            "Bahasa Indonesia sekarang hanya terdiri atas kata-kata yang berasal dari bahasa Melayu.",
        },
        {
          column: 2,
          label:
            "Banyak tokoh pergerakan dari Jawa menolak bahasa Melayu sebagai bahasa persatuan.",
        },
      ],
    },
  },
};

export default item;
