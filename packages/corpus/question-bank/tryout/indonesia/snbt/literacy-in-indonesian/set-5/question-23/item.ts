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
          isCorrect: true,
          label:
            "Dengan menahan dua kotak yang belum cocok dan mencatat perubahan tugas, Bima menunjukkan bahwa akuntabilitas dapat menuntut hasil yang lebih sedikit tetapi dapat diperiksa.",
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
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
