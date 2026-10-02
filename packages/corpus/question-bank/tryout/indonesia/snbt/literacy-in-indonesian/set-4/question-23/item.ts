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
          isCorrect: true,
          label:
            "Perubahan terjadi ketika Nisa memecah hambatan menjadi tindakan yang dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Tindakan kecil terutama berguna karena menunda bagian konflik yang belum selesai.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
