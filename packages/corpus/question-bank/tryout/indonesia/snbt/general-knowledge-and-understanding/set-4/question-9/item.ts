import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "purnama",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kenaikan harga beras bulan ini terasa *nyata* bagi para pedagang kecil.",
        },
        {
          correct: true,
          label:
            "Gerak matahari dari timur ke barat yang kita lihat setiap hari sebenarnya hanyalah gerak *semu*.",
        },
        {
          correct: false,
          label:
            "Garis pantai pulau itu tampak *samar* dari geladak kapal karena kabut.",
        },
        {
          correct: false,
          label:
            "Cerita rakyat di desa itu menyebut makhluk *gaib* penjaga hutan.",
        },
        {
          correct: false,
          label: "Air telaga itu sangat *jernih* sehingga dasarnya terlihat.",
        },
      ],
    },
  },
};

export default item;
