import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima.",
        },
        {
          correct: false,
          label:
            "Karena undangan terbuka, asal peserta dan alasan ketidakhadiran tidak perlu diperiksa.",
        },
        {
          correct: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          correct: true,
          label:
            "Inklusif berarti menyediakan cara yang layak agar beragam kelompok dapat dipertimbangkan, bukan menjamin semua tuntutan menang.",
        },
        {
          correct: false,
          label:
            "Masukan hanya layak dipertimbangkan jika disampaikan langsung secara lisan dalam pertemuan.",
        },
      ],
    },
  },
};

export default item;
