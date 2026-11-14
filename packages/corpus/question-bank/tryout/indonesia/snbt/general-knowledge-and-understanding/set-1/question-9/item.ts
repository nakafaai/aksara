import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "cabai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Hujan yang berlebihan di sentra produksi dapat berujung pada tercatatnya cabai sebagai penyumbang inflasi bulanan.",
        },
        {
          correct: true,
          label:
            "Pengolahan cabai menjadi pasta membantu meredam lonjakan harga karena mengurangi jumlah cabai yang dibeli rumah tangga.",
        },
        {
          correct: false,
          label:
            "Kenaikan suku bunga tidak menambah pasokan cabai ketika panen merosot akibat hujan.",
        },
        {
          correct: false,
          label:
            "Naiknya harga satu barang saja belum cukup untuk disebut inflasi, walaupun barang itu dapat menjadi penyumbang inflasi.",
        },
        {
          correct: false,
          label:
            "Permintaan cabai yang cenderung tetap membuat kenaikan suku bunga kurang ampuh untuk meredam harga cabai.",
        },
      ],
    },
  },
};

export default item;
