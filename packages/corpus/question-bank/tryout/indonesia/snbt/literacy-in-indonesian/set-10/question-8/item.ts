import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "front-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pembelian minuman bertanda di Chili turun setelah aturan itu berlaku.",
        },
        {
          correct: true,
          label:
            "Pembeli umumnya menganggap produk tanpa logo kurang sehat dan menghindarinya.",
        },
        {
          correct: false,
          label:
            "Sebagian besar pembeli tidak sempat membaca tabel nilai gizi di toko.",
        },
        {
          correct: false,
          label:
            "Tanda segi delapan hitam di Chili dicetak dengan warna yang sangat mencolok mata.",
        },
        {
          correct: false,
          label:
            "Produsen lebih suka memasang logo daripada tanda peringatan di kemasannya.",
        },
      ],
    },
  },
};

export default item;
