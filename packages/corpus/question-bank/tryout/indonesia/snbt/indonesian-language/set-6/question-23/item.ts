import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kemajuan bergantung pada penyelesaian tugas besar sebelum meminta orang lain meninjaunya.",
        },
        {
          isCorrect: false,
          label:
            "Benda atau latar membentuk hasil lebih kuat daripada pilihan khusus yang dibuat tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Bukti yang belum pasti sebaiknya disimpan sampai tokoh dapat menawarkan hasil lengkap.",
        },
        {
          isCorrect: false,
          label:
            "Tindakan kecil terutama berguna karena menunda bagian konflik yang belum selesai.",
        },
        {
          isCorrect: true,
          label:
            "Kemampuan Dimas menemukan kesalahan melalui substitusi setelah bantuan dikurangi menunjukkan kemajuan pemahaman yang tidak terlihat dari jumlah soal selesai saja.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
