import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "solar-lamps",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "jumlah lampu yang mati meningkat pada bulan April karena panel yang terhalang tidak mengisi baterai dengan baik",
        },
        {
          correct: false,
          label:
            "teknisi desa mencatat waktu lampu mati tepat pada pukul 05.00 setiap pagi",
        },
        {
          correct: false,
          label:
            "pohon ketapang di sepanjang jalan harus ditebang agar lampu tetap menyala",
        },
        {
          correct: false,
          label:
            "lampu tenaga surya bekerja lebih buruk daripada lampu yang memakai listrik jaringan",
        },
        {
          correct: false,
          label:
            "hujan selama bulan April merusak baterai yang tersimpan di dalam kotak logam",
        },
      ],
    },
  },
};

export default item;
