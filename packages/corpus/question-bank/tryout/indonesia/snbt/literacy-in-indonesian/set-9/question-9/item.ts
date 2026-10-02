import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menetapkan bahwa angka lima unit merupakan taksiran lapangan yang sah selama seluruh operasi hitung dilakukan dengan benar.",
        },
        {
          isCorrect: false,
          label:
            "Menunjukkan bahwa setiap perpindahan karbon harus dianggap keluar agar tidak terjadi penghitungan ganda.",
        },
        {
          isCorrect: false,
          label:
            "Menggantikan kebutuhan membaca arah panah karena nama komponen sudah menentukan hasil akhirnya.",
        },
        {
          isCorrect: false,
          label:
            "Membatasi pembahasan pada cadangan tumbuhan sehingga data tanah dan perairan tidak memiliki fungsi apa pun.",
        },
        {
          isCorrect: true,
          label:
            "Menjelaskan mengapa arus yang sama dapat dihitung sebagai perpindahan keluar atau sebagai perpindahan internal, bergantung pada komponen yang dimasukkan ke dalam perhitungan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
