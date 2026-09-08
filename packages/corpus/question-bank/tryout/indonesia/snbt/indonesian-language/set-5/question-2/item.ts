import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pada kondisi dengan perubahan, hasil rata-rata tercatat $$68$$. Karena berbeda dari kondisi lain, perubahan yang diuji merupakan satu-satunya penjelasan yang masuk akal.",
        },
        {
          isCorrect: false,
          label:
            "Durasi singkat membatasi ketelitian, tetapi pola yang terlihat sudah dapat digeneralisasi ke setiap keadaan sejenis.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata $$68$$ persen cahaya melewati sampel setelah disaring dengan kerikil, pasir, dan arang. Ukuran kejernihan itu tidak membuktikan bahwa air aman diminum.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan yang tercatat belum dapat dianggap sebagai bukti sama sekali sebelum pengulangan menghasilkan rata-rata yang persis sama.",
        },
        {
          isCorrect: false,
          label:
            "Kondisi pembanding membuat data dasar tidak diperlukan, sehingga nilai pada kondisi perubahan saja cukup untuk menyusun simpulan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
