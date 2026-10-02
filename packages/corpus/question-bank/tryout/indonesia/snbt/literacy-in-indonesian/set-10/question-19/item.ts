import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Menjelaskan mengapa tujuan administratif peta dan pengalaman terbatas para penulis harian menghasilkan bukti yang berbeda, bukan salah satunya otomatis keliru.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan bahwa pengalaman pribadi selalu lebih berat daripada dokumen resmi dalam menyusun sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Mengubah perbedaan rute menjadi kesalahan yang harus dihapus sebelum catatan dapat digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Mengizinkan siswa menganggap rute yang tidak ditulis memiliki pengalaman yang sama dengan rute terdekat.",
        },
        {
          isCorrect: false,
          label:
            "Menetapkan bahwa semua buku harian memiliki perspektif yang sama karena ditulis warga kampung.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
