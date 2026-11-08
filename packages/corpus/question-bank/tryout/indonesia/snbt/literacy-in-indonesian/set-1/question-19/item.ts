import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "car-free-day",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah pengunjung Jalan Merdeka pada setiap Minggu pagi selama program berlangsung.",
        },
        {
          correct: false,
          label: "Kadar karbon monoksida di Jalan Merdeka pada hari kerja.",
        },
        {
          correct: true,
          label:
            "Kualitas udara di Jalan Kenanga dan Jalan Cempaka pada Minggu pagi sebelum dan selama program berlangsung.",
        },
        {
          correct: false,
          label:
            "Pendapatan pedagang kaki lima yang mendapat lapak di Jalan Merdeka.",
        },
        {
          correct: false,
          label:
            "Jumlah sepeda yang melintas di Jalan Merdeka selama jam bebas kendaraan.",
        },
      ],
    },
  },
};

export default item;
