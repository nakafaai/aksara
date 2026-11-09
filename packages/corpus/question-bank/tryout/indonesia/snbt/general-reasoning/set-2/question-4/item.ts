import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "museum",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kebijakan tiket gratis menarik $$320$$ pengunjung baru setiap minggu.",
        },
        {
          correct: false,
          label:
            "Kebijakan tiket gratis meningkatkan pendapatan tiket mingguan museum.",
        },
        {
          correct: false,
          label:
            "Pengunjung pada akhir pekan tidak terpengaruh oleh kebijakan tiket gratis.",
        },
        {
          correct: true,
          label:
            "Kebijakan tiket gratis menambah pengunjung mingguan, tetapi sebagian pengunjung tampaknya hanya memindahkan hari kunjungannya ke hari Rabu.",
        },
        {
          correct: false,
          label:
            "Pengunjung hari Selasa berkurang karena museum menaikkan harga tiket pada hari itu selama bulan kedua untuk menutup biaya tiket gratis hari Rabu.",
        },
      ],
    },
  },
};

export default item;
