import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kenaikan dari $$24$$ menjadi $$35$$ membuktikan bahwa ringkasan jadwal menyebabkan seluruh tambahan peminjaman, termasuk saat cuaca dan kegiatan sekolah berubah.",
        },
        {
          correct: false,
          label:
            "Pembahasan bersama pelajar dan pengelola membuat selisih antara nilai uji dan pembanding tidak lagi diperlukan untuk mengambil keputusan.",
        },
        {
          correct: true,
          label:
            "Nilai $$35$$ pada uji, dibandingkan dengan $$26$$ pada kondisi pembanding, mendukung penerusan ringkasan jadwal dalam skala terbatas. Pengaruh cuaca dan kegiatan sekolah tetap perlu diuji.",
        },
        {
          correct: false,
          label:
            "Karena jadwal serta jumlah petugas dijaga, cuaca dan kegiatan sekolah hanya memengaruhi redaksi laporan, bukan jangkauan penerapan hasil.",
        },
        {
          correct: false,
          label:
            "Pengulangan pada minggu lain hanya akan mengukuhkan simpulan awal dan tidak mungkin mengubah penafsiran tentang manfaat jadwal.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
