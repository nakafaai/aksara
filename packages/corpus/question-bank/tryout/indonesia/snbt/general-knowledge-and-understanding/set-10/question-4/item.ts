import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
        {
          correct: true,
          label:
            "Simpulan diberi status sementara sampai pengulangan dengan sampel lebih luas selesai.",
        },
        {
          correct: false,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          correct: false,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          correct: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
      ],
    },
  },
};

export default item;
