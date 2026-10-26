import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menetapkan bahwa angka lima unit merupakan taksiran lapangan yang sah selama seluruh operasi hitung dilakukan dengan benar.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa setiap perpindahan karbon harus dianggap keluar agar tidak terjadi penghitungan ganda.",
        },
        {
          correct: false,
          label:
            "Menggantikan kebutuhan membaca arah panah karena nama komponen sudah menentukan hasil akhirnya.",
        },
        {
          correct: false,
          label:
            "Membatasi pembahasan pada cadangan tumbuhan sehingga data tanah dan perairan tidak memiliki fungsi apa pun.",
        },
        {
          correct: true,
          label:
            "Menjelaskan mengapa arus yang sama dapat dihitung sebagai perpindahan keluar atau sebagai perpindahan internal, bergantung pada komponen yang dimasukkan ke dalam perhitungan.",
        },
      ],
    },
  },
};

export default item;
