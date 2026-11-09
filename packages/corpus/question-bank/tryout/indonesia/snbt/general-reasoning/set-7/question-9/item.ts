import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "sampling",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membagikan angket kepada semua anggota klub buku di satu SMA yang paling besar di kota itu.",
        },
        {
          correct: false,
          label:
            "Meminta siswa mengisi angket daring yang diumumkan melalui akun media sosial perpustakaan kota.",
        },
        {
          correct: true,
          label:
            "Memilih beberapa kelas secara acak dari setiap SMA, lalu mewawancarai semua siswa di kelas terpilih.",
        },
        {
          correct: false,
          label:
            "Mewawancarai siswa yang ditemui di toko buku terbesar di kota itu pada setiap hari Minggu selama sebulan.",
        },
        {
          correct: false,
          label:
            "Menanyakan perkiraan jam membaca siswa kepada kepala sekolah di setiap SMA di kota itu.",
        },
      ],
    },
  },
};

export default item;
