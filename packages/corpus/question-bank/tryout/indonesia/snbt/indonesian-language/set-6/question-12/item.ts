import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
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
        {
          isCorrect: true,
          label:
            "Kartu tujuan menghasilkan 10 catatan lengkap lebih banyak daripada catatan biasa dari jumlah pertemuan yang sama; hasil itu belum mengukur perubahan nilai semester.",
        },
        {
          isCorrect: false,
          label:
            "Kondisi pembanding membuat data dasar tidak diperlukan, sehingga nilai pada kondisi perubahan saja cukup untuk menyusun simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Kondisi pembanding menghasilkan nilai rata-rata 17; karena berbeda dari kondisi lain, perubahan yang diuji merupakan satu-satunya penjelasan yang masuk akal.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
