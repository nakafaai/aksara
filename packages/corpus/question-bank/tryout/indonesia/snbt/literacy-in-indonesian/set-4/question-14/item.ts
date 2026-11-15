import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "class-size",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Mengecilkan kelas 1 lebih dulu di sekolah-sekolah dengan siswa paling kurang mampu.",
        },
        {
          correct: false,
          label:
            "Mengecilkan semua kelas 1 sekaligus tahun depan dengan merekrut guru tanpa sertifikat.",
        },
        {
          correct: true,
          label:
            "Menambah kelas kecil setiap tahun sebanyak guru bersertifikat yang dapat diangkat tahun itu.",
        },
        {
          correct: false,
          label:
            "Membatalkan pengecilan kelas dan memakai seluruh dananya untuk membangun ruang kelas baru.",
        },
        {
          correct: false,
          label:
            "Menunda semua perubahan sampai kabupaten itu menjalankan percobaan acak sendiri.",
        },
      ],
    },
  },
};

export default item;
