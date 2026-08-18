import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Dugaan berdasarkan jumlah penduduk Indonesia semata",
      value: false,
    },
    {
      label:
        "Jarak Indonesia yang paling dekat dengan seluruh pantai Seychelles",
      value: false,
    },
    {
      label: "Pernyataan seorang peneliti tanpa data pemodelan",
      value: false,
    },
    {
      label: "Penilaian umum terhadap kebijakan sampah Indonesia",
      value: false,
    },
    {
      label:
        "Hasil simulasi dalam studi ilmiah yang memperhitungkan arus, ombak, angin, dan sifat sampah",
      value: true,
    },
  ],
};

export default choices;
