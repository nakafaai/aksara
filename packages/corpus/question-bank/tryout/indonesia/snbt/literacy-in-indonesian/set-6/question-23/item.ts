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
          correct: false,
          label:
            "Tindakan kecil terutama berguna karena menunda bagian konflik yang belum selesai.",
        },
        {
          correct: true,
          label:
            "Kemampuan Dimas menemukan kesalahan melalui substitusi setelah bantuan dikurangi menunjukkan kemajuan pemahaman yang tidak terlihat dari jumlah soal selesai saja.",
        },
      ],
    },
  },
};

export default item;
