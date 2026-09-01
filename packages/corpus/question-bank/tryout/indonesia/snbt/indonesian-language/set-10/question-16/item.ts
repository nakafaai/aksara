import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Siswa memakai peta sebagai bukti bahwa seluruh lampu berfungsi dan buku harian sebagai bukti bahwa semua warga mengalami perubahan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menolak peta karena dibuat kantor desa dan hanya menerima buku harian sebagai sumber pengalaman yang benar.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menggabungkan tiga pengalaman menjadi gambaran seluruh kampung karena lokasinya dapat ditempelkan pada peta.",
        },
        {
          isCorrect: true,
          label:
            "Siswa menghubungkan lokasi administratif dengan pengalaman malam yang terikat rute dan waktu, lalu membatasi kesimpulan pada bagian kampung yang benar-benar tercakup.",
        },
        {
          isCorrect: false,
          label:
            "Siswa memperlakukan catatan ‘pemeriksaan selesai’ sebagai bukti kinerja karena dibuat lebih dekat dengan waktu pemasangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
