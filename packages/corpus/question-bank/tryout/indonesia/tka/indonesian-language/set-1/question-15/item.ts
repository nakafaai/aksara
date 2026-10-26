import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kebun belakang paling layak menjadi lokasi belajar karena suhu rata-ratanya terendah.",
        },
        {
          correct: true,
          label:
            "Lima hari pengukuran belum mewakili seluruh musim dan kondisi cuaca.",
        },
        {
          correct: false,
          label:
            "Bangku baru meningkatkan kenyamanan siswa berdasarkan pengamatan singkat tim.",
        },
        {
          correct: false,
          label:
            "Pohon dapat dianggap penyebab utama karena lokasi di bawahnya lebih sejuk.",
        },
        {
          correct: false,
          label:
            "Angka pada tabel cukup kuat untuk menentukan lokasi bangku tanpa pengukuran lanjutan.",
        },
      ],
    },
  },
  stimulus: "heat-map",
};

export default item;
