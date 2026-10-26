import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa memakai $$240$$ catatan buku tamu untuk membuktikan bahwa seluruh pengunjung di lima kota mengalami pameran dengan cara yang sama.",
        },
        {
          correct: false,
          label:
            "Siswa menolak poster sebagai sumber sejarah karena bahan promosi tidak dapat memberi informasi tentang tujuan penyelenggara.",
        },
        {
          correct: true,
          label:
            "Siswa membandingkan citra inklusif pada lima poster dengan tanggapan sukarela dari dua kota, lalu membatasi simpulan karena tidak ada data seluruh pengunjung.",
        },
        {
          correct: false,
          label:
            "Siswa menganggap buku tamu lebih akurat daripada poster karena dibuat setelah pameran berlangsung dan memuat lebih banyak kata.",
        },
        {
          correct: false,
          label:
            "Siswa menyimpulkan bahwa keluhan akses membatalkan seluruh komentar positif karena kedua jenis tanggapan tidak dapat muncul bersama.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
