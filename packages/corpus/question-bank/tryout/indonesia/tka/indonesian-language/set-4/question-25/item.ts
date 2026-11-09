import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "honesty-canteen",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "rencana itu dibuat untuk membuktikan bahwa pendapat Bu Ratna keliru",
        },
        {
          correct: false,
          label:
            "rencana itu menggantikan kampanye “Bayar Dulu, Baru Pergi” yang digelar OSIS",
        },
        {
          correct: false,
          label:
            "rencana itu bertujuan menaikkan harga barang di kantin kejujuran",
        },
        {
          correct: true,
          label:
            "rencana itu menanggapi keraguan Bu Ratna tentang kemungkinan salah hitung stok",
        },
        {
          correct: false,
          label:
            "rencana itu dibuat karena Dimas menolak pembayaran dengan kode QR",
        },
      ],
    },
  },
};

export default item;
