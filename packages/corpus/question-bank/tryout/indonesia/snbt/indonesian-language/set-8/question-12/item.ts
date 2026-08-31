import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kondisi pembanding membuat data dasar tidak diperlukan, sehingga nilai pada kondisi perubahan saja cukup untuk menyusun simpulan.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 14 adalah kondisi pembanding untuk format satuan seragam; musim dan waktu pengukuran tetap menentukan keterbandingan kedalaman.",
        },
        {
          isCorrect: false,
          label:
            "Kondisi pembanding menghasilkan nilai rata-rata 14; karena berbeda dari kondisi lain, perubahan yang diuji merupakan satu-satunya penjelasan yang masuk akal.",
        },
        {
          isCorrect: false,
          label:
            "Durasi singkat membatasi ketelitian, tetapi pola yang terlihat sudah dapat digeneralisasi ke setiap keadaan sejenis.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan yang tercatat belum dapat dianggap sebagai bukti sama sekali sebelum pengulangan menghasilkan rata-rata yang persis sama.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
