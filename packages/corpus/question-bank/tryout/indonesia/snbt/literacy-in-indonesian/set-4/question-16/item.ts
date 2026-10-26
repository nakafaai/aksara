import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang perubahan fungsi bangunan bersejarah untuk menyusun penjelasan yang final dan dianggap berlaku untuk semua masa.",
        },
        {
          correct: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang perubahan fungsi bangunan bersejarah untuk menyusun penjelasan yang menghapus perbedaan tujuan kedua sumber.",
        },
        {
          correct: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang perubahan fungsi bangunan bersejarah untuk menyusun penjelasan dengan mengikuti sumber yang lebih baru secara otomatis.",
        },
        {
          correct: false,
          label:
            "Siswa membandingkan dua jenis sumber tentang perubahan fungsi bangunan bersejarah untuk menyusun penjelasan tanpa menilai asal serta tujuan tiap sumber.",
        },
        {
          correct: true,
          label:
            "Siswa membandingkan dua jenis sumber tentang perubahan fungsi bangunan bersejarah untuk menyusun penjelasan yang terbatas dan dapat diperiksa.",
        },
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
