import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menjelaskan mengapa tujuan administratif peta dan pengalaman terbatas para penulis harian menghasilkan bukti yang berbeda, bukan salah satunya otomatis keliru.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa pengalaman pribadi selalu lebih berat daripada dokumen resmi dalam menyusun sejarah.",
        },
        {
          correct: false,
          label:
            "Mengubah perbedaan rute menjadi kesalahan yang harus dihapus sebelum catatan dapat digunakan.",
        },
        {
          correct: false,
          label:
            "Mengizinkan siswa menganggap rute yang tidak ditulis memiliki pengalaman yang sama dengan rute terdekat.",
        },
        {
          correct: false,
          label:
            "Menetapkan bahwa semua buku harian memiliki perspektif yang sama karena ditulis warga kampung.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
