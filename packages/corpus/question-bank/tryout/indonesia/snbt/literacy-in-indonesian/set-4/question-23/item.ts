import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kemajuan bergantung pada penyelesaian tugas besar sebelum meminta orang lain meninjaunya.",
        },
        {
          correct: false,
          label:
            "Benda atau latar membentuk hasil lebih kuat daripada pilihan khusus yang dibuat tokoh.",
        },
        {
          correct: false,
          label:
            "Bukti yang belum pasti sebaiknya disimpan sampai tokoh dapat menawarkan hasil lengkap.",
        },
        {
          correct: true,
          label:
            "Perubahan terjadi ketika Nisa memecah hambatan menjadi tindakan yang dapat diperiksa.",
        },
        {
          correct: false,
          label:
            "Tindakan kecil terutama berguna karena menunda bagian konflik yang belum selesai.",
        },
      ],
    },
  },
};

export default item;
