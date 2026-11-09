import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa memakai peta sebagai bukti bahwa seluruh lampu berfungsi dan buku harian sebagai bukti bahwa semua warga mengalami perubahan yang sama.",
        },
        {
          correct: false,
          label:
            "Siswa menolak peta karena dibuat kantor desa dan hanya menerima buku harian sebagai sumber pengalaman yang benar.",
        },
        {
          correct: false,
          label:
            "Siswa menggabungkan tiga pengalaman menjadi gambaran seluruh kampung karena lokasinya dapat ditempelkan pada peta.",
        },
        {
          correct: true,
          label:
            "Siswa menghubungkan lokasi administratif dengan pengalaman malam yang terikat rute dan waktu, lalu membatasi kesimpulan pada bagian kampung yang benar-benar tercakup.",
        },
        {
          correct: false,
          label:
            "Siswa memperlakukan catatan ‘pemeriksaan selesai’ sebagai bukti kinerja karena dibuat lebih dekat dengan waktu pemasangan.",
        },
      ],
    },
  },
};

export default item;
