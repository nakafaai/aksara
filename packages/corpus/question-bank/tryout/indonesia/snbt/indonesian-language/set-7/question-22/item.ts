import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemeriksaan petugas membuat kartu Arum berlaku sebagai prosedur resmi bagi setiap pasien dengan kondisi apa pun.",
        },
        {
          isCorrect: true,
          label:
            "Meminta petugas memeriksa kartu membuat penyederhanaan Arum tetap sesuai alur umum dan mengungkap pengecualian yang sebelumnya ia lewatkan.",
        },
        {
          isCorrect: false,
          label:
            "Menggambar dengan ikon sudah menjamin semua pasien memahami kartu meskipun isi dan pengecualiannya belum diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Kesalahan awal Arum menunjukkan bahwa petunjuk visual sebaiknya dihapus dan seluruh arahan disampaikan secara lisan.",
        },
        {
          isCorrect: false,
          label:
            "Koreksi perawat membuktikan bahwa Arum tidak perlu menggunakan informasi dari petugas administrasi dalam kartu alurnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
