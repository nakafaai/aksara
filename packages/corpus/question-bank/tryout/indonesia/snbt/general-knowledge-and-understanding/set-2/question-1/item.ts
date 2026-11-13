import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "delta",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf ketiga menambahkan rupa delta keempat, yaitu delta yang dibentuk oleh kegiatan manusia, sebagai pelengkap tiga rupa pada paragraf kedua.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga membantah paragraf kedua dengan menunjukkan bahwa nasib delta kini ditentukan oleh manusia, bukan lagi oleh tarik-menarik antara sungai dan laut.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga memberi pengecualian bagi paragraf pertama, yaitu daratan delta berhenti tumbuh ke arah laut begitu bendungan dibangun di hulu.",
        },
        {
          correct: true,
          label:
            "Paragraf ketiga memakai syarat keseimbangan dari paragraf kedua untuk menunjukkan bahwa pertumbuhan daratan pada paragraf pertama dapat berbalik menjadi penyusutan.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga memperinci proses pada paragraf pertama dengan menambahkan pemadatan endapan sebagai tahap akhir pembentukan daratan delta.",
        },
      ],
    },
  },
};

export default item;
