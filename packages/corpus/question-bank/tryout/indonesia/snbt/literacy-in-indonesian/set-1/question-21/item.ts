import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "car-free-day",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah pengunjung hari bebas kendaraan terus bertambah setiap bulan.",
        },
        {
          correct: false,
          label:
            "Pedagang di sepanjang Jalan Merdeka mendukung perluasan program.",
        },
        {
          correct: false,
          label:
            "Warga lebih memilih bersepeda daripada berjalan kaki pada Minggu pagi.",
        },
        {
          correct: false,
          label:
            "Pengukuran karbon monoksida lebih akurat pada hari Minggu daripada pada hari kerja.",
        },
        {
          correct: true,
          label:
            "Penurunan polusi di Jalan Merdeka tidak sekadar berpindah ke jalan-jalan di sekitarnya.",
        },
      ],
    },
  },
};

export default item;
