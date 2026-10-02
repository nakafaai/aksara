import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dua usulan memunculkan perdebatan tentang keaslian, lalu pemeriksaan material mengarahkan pilihan intervensi minimum.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menetapkan satu tahun acuan, lalu bagian berikutnya memilih warna seragam untuk mengembalikan keadaan tahun itu.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal memilih penggantian menyeluruh, lalu bagian berikutnya hanya menyusun catatan untuk membenarkan keputusan tersebut.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membahas bukti beberapa masa, lalu bagian berikutnya menolak pemeriksaan material karena foto dianggap sudah cukup.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menilai daya tarik bangunan bagi pengunjung, lalu bagian berikutnya menentukan perbaikan melalui pemungutan suara.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
