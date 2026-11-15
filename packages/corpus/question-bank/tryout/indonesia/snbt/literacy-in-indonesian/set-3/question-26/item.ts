import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "anchoring-price",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa peserta menebak dengan asal karena mereka tidak tahu jumlah negara Afrika di Perserikatan Bangsa-Bangsa",
        },
        {
          correct: true,
          label:
            "menyingkirkan dugaan bahwa angka jangkar berpengaruh hanya karena orang menganggapnya sebagai petunjuk jawaban",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa penjelasan pertama lebih tepat daripada penjelasan kedua tentang efek jangkar",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa roda angka dalam percobaan itu sengaja diatur oleh peneliti agar hasilnya sesuai harapan",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa median tebakan kedua kelompok berbeda sekitar dua puluh poin persentase",
        },
      ],
    },
  },
};

export default item;
