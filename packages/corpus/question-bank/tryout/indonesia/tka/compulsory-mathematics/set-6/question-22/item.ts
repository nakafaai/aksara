import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "hujan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Jangkauan curah hujan Kota P lebih dari dua kali jangkauan curah hujan Kota Q.",
        },
        {
          correct: true,
          label:
            "Rata-rata curah hujan Kota Q tepat $$60\\text{ mm}$$ lebih tinggi daripada rata-rata curah hujan Kota P.",
        },
        {
          correct: false,
          label: "Pada bulan Mei, curah hujan Kota Q $$60\\%$$ lebih tinggi daripada curah hujan Kota P.",
        },
        {
          correct: true,
          label: "Selisih curah hujan kedua kota paling besar terjadi pada bulan Juni.",
        },
        {
          correct: true,
          label:
            "Jika kedua belas data curah hujan kedua kota digabungkan, rata-ratanya lebih kecil daripada mediannya.",
        },
      ],
    },
  },
};

export default item;
