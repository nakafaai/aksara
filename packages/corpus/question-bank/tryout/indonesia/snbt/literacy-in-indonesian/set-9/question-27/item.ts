import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dengan memotong ujung benang, Wulan akhirnya kembali pada penilaian awal bahwa seluruh jejak lama merupakan kerusakan.",
        },
        {
          correct: false,
          label:
            "Dengan mempertahankan jahitan, Wulan menolak setiap perubahan baru agar kostum tetap sama persis dengan keadaan tahun $$1998$$.",
        },
        {
          correct: false,
          label:
            "Dengan menaruh kartu $$2026$$ di depan label lama, Wulan menyembunyikan sejarah kostum dari pemain baru.",
        },
        {
          correct: true,
          label:
            "Wulan memperbaiki bagian yang mengganggu pemakaian, tetapi mempertahankan jahitan yang membawa riwayat, sehingga perawatan tidak disamakan dengan menghapus masa lalu.",
        },
        {
          correct: false,
          label:
            "Wulan memotong benang agar label lama terlepas perlahan setelah kartu katalog baru dipasang.",
        },
      ],
    },
  },
};

export default item;
