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
            "Semua siswa berhenti membeli gorengan setelah label merah dipasang di kantin.",
        },
        {
          correct: false,
          label:
            "Warung depan sekolah menjual gorengan dengan harga lebih murah daripada kantin.",
        },
        {
          correct: false,
          label:
            "Konsumsi gorengan siswa naik lebih dari dua kali lipat sejak label dipasang.",
        },
      ],
    },
  },
};

export default item;
