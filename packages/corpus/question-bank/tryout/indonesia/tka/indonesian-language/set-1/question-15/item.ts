import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "language-suitability",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kebun belakang paling layak menjadi lokasi belajar karena suhu rata-ratanya terendah.",
        },
        {
          isCorrect: true,
          label:
            "Lima hari pengukuran belum mewakili seluruh musim dan kondisi cuaca.",
        },
        {
          isCorrect: false,
          label:
            "Bangku baru meningkatkan kenyamanan siswa berdasarkan pengamatan singkat tim.",
        },
        {
          isCorrect: false,
          label:
            "Pohon dapat dianggap penyebab utama karena lokasi di bawahnya lebih sejuk.",
        },
        {
          isCorrect: false,
          label:
            "Angka pada tabel cukup kuat untuk menentukan lokasi bangku tanpa pengukuran lanjutan.",
        },
      ],
    },
  },
  stimulusKey: "heat-map",
};

export default item;
