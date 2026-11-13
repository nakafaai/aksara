import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "serapan",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kata daerah yang sudah jarang dipakai dapat kembali lazim setelah dijadikan padanan istilah.",
        },
        {
          column: 2,
          label:
            "Makna Jawa kata *mengunduh* sudah tidak tercatat dalam KBBI karena kalah populer oleh makna barunya.",
        },
        {
          column: 2,
          label:
            "Kata daerah yang sudah sering muncul di media nasional tidak perlu lagi ditulis dengan huruf miring dalam tulisan baku.",
        },
        {
          column: 1,
          label:
            "Penutur bahasa Indonesia tetap dapat menunjukkan rasa hormat kepada lawan bicara walaupun bahasanya tidak memiliki tingkat tutur seperti bahasa Jawa.",
        },
      ],
    },
  },
};

export default item;
