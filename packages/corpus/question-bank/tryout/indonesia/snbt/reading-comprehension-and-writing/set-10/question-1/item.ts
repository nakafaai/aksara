import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "main-idea",
  },
  stimulus: "net-recycling",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jaring dari plastik tidak mudah hancur dan dapat menjerat penyu.",
        },
        {
          correct: false,
          label:
            "Koperasi membeli jaring rusak dengan harga Rp2.000,00 per kilogram.",
        },
        {
          correct: false,
          label: "Para nelayan berdiskusi dalam pertemuan bulanan koperasi.",
        },
        {
          correct: false,
          label:
            "Koperasi telah mengumpulkan lebih dari 3 ton jaring dalam setahun.",
        },
        {
          correct: true,
          label:
            "Koperasi nelayan Desa Tanjungrejo mengubah jaring rusak yang dulu dibuang menjadi barang bernilai sekaligus membuat pantai lebih bersih.",
        },
      ],
    },
  },
};

export default item;
