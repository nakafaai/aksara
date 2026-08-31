import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan memotong ujung benang, Wulan akhirnya kembali pada penilaian awal bahwa seluruh jejak lama merupakan kerusakan.",
        },
        {
          isCorrect: false,
          label:
            "Dengan mempertahankan jahitan, Wulan menolak setiap perubahan baru agar kostum tetap sama persis dengan keadaan tahun 1998.",
        },
        {
          isCorrect: false,
          label:
            "Dengan menaruh kartu 2026 di depan label lama, Wulan menyembunyikan sejarah kostum dari pemain baru.",
        },
        {
          isCorrect: true,
          label:
            "Wulan memperbaiki bagian yang mengganggu pemakaian, tetapi mempertahankan jahitan yang membawa riwayat, sehingga perawatan tidak disamakan dengan menghapus masa lalu.",
        },
        {
          isCorrect: false,
          label:
            "Wulan memotong benang agar label lama terlepas perlahan setelah kartu katalog baru dipasang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
