import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "klinik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Program vaksin untuk kucing membuat kunjungan anjing turun selama program berlangsung.",
        },
        {
          correct: true,
          label:
            "Program vaksin gratis menambah kunjungan kucing, terutama pada bulan Maret dan April.",
        },
        {
          correct: false,
          label:
            "Setelah program selesai, kunjungan kucing kembali persis sama dengan sebelum program.",
        },
        {
          correct: false,
          label:
            "Sebagian besar kucing di kota itu sudah mendapat vaksin melalui program tersebut.",
        },
        {
          correct: false,
          label:
            "Klinik itu menutup layanan untuk anjing selama bulan Maret dan April.",
        },
      ],
    },
  },
};

export default item;
