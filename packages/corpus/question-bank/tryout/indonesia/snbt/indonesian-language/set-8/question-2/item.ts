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
          isCorrect: false,
          label:
            "Pada kondisi dengan perubahan, hasil rata-rata tercatat 3; karena berbeda dari kondisi lain, perubahan yang diuji merupakan satu-satunya penjelasan yang masuk akal.",
        },
        {
          isCorrect: true,
          label:
            "Nilai 3 adalah rata-rata pada daun yang bagian bawahnya dilapisi petroleum jelly; daun petik belum mewakili tumbuhan utuh.",
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
  stimulusKey: "passage-1",
};

export default item;
