import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pemeriksaan petugas membuat kartu Arum berlaku sebagai prosedur resmi bagi setiap pasien dengan kondisi apa pun.",
        },
        {
          correct: true,
          label:
            "Meminta petugas memeriksa kartu membuat penyederhanaan Arum tetap sesuai alur umum dan mengungkap pengecualian yang sebelumnya ia lewatkan.",
        },
        {
          correct: false,
          label:
            "Menggambar dengan ikon sudah menjamin semua pasien memahami kartu meskipun isi dan pengecualiannya belum diperiksa.",
        },
        {
          correct: false,
          label:
            "Kesalahan awal Arum menunjukkan bahwa petunjuk visual sebaiknya dihapus dan seluruh arahan disampaikan secara lisan.",
        },
        {
          correct: false,
          label:
            "Koreksi perawat membuktikan bahwa Arum tidak perlu menggunakan informasi dari petugas administrasi dalam kartu alurnya.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
