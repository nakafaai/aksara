import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "canteen-labels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Turunnya penjualan merah di kantin belum tentu berarti siswa makan lebih sedikit gorengan.",
        },
        {
          correct: false,
          label:
            "Siswa makan lebih sedikit gorengan karena penjualan merah di kantin turun 250 porsi.",
        },
        {
          correct: false,
          label:
            "Konsumsi gorengan siswa kemungkinan besar justru meningkat sejak label dipasang.",
        },
        {
          correct: false,
          label:
            "Warung depan sekolah menjual gorengan dengan harga lebih murah daripada kantin.",
        },
        {
          correct: false,
          label:
            "Sebagian besar siswa kini membeli gorengan di warung, bukan di kantin.",
        },
      ],
    },
  },
};

export default item;
