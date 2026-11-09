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
            "Kondisi pembanding membuat data dasar tidak diperlukan, sehingga nilai pada kondisi perubahan saja cukup untuk menyusun simpulan.",
        },
        {
          correct: false,
          label:
            "Pada kondisi dengan perubahan, hasil rata-rata tercatat $$18$$. Karena berbeda dari kondisi lain, perubahan yang diuji merupakan satu-satunya penjelasan yang masuk akal.",
        },
        {
          correct: false,
          label:
            "Durasi singkat membatasi ketelitian, tetapi pola yang terlihat sudah dapat digeneralisasi ke setiap keadaan sejenis.",
        },
        {
          correct: true,
          label:
            "Nilai $$18$$ adalah rata-rata pada pencahayaan enam jam dengan jarak lampu tetap. Jumlah wadah dan delapan hari pengamatan membatasi penafsiran di luar uji.",
        },
        {
          correct: false,
          label:
            "Perbedaan yang tercatat belum dapat dianggap sebagai bukti sama sekali sebelum pengulangan menghasilkan rata-rata yang persis sama.",
        },
      ],
    },
  },
};

export default item;
