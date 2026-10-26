import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Dua usulan memunculkan perdebatan tentang keaslian, lalu pemeriksaan material mengarahkan pilihan intervensi minimum.",
        },
        {
          correct: false,
          label:
            "Bagian awal menetapkan satu tahun acuan, lalu bagian berikutnya memilih warna seragam untuk mengembalikan keadaan tahun itu.",
        },
        {
          correct: false,
          label:
            "Bagian awal memilih penggantian menyeluruh, lalu bagian berikutnya hanya menyusun catatan untuk membenarkan keputusan tersebut.",
        },
        {
          correct: false,
          label:
            "Bagian awal membahas bukti beberapa masa, lalu bagian berikutnya menolak pemeriksaan material karena foto dianggap sudah cukup.",
        },
        {
          correct: false,
          label:
            "Bagian awal menilai daya tarik bangunan bagi pengunjung, lalu bagian berikutnya menentukan perbaikan melalui pemungutan suara.",
        },
      ],
    },
  },
};

export default item;
