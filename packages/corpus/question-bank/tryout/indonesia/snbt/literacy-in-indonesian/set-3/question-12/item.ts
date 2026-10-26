import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kondisi pembanding membuat data dasar tidak diperlukan, sehingga nilai pada kondisi perubahan saja cukup untuk menyusun simpulan.",
        },
        {
          correct: false,
          label:
            "Kondisi pembanding menghasilkan nilai rata-rata $$26$$. Karena berbeda dari kondisi lain, perubahan yang diuji merupakan satu-satunya penjelasan yang masuk akal.",
        },
        {
          correct: false,
          label:
            "Durasi singkat membatasi ketelitian, tetapi pola yang terlihat sudah dapat digeneralisasi ke setiap keadaan sejenis.",
        },
        {
          correct: false,
          label:
            "Perbedaan yang tercatat belum dapat dianggap sebagai bukti sama sekali sebelum pengulangan menghasilkan rata-rata yang persis sama.",
        },
        {
          correct: true,
          label:
            "Nilai $$26$$ adalah rata-rata peminjaman selesai per kunjungan pada kondisi pembanding untuk ringkasan jadwal. Selisih terhadap nilai uji $$35$$ tetap harus dibaca bersama pengaruh cuaca dan kegiatan sekolah.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
