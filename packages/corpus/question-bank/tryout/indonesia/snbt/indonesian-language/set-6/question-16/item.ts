import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Siswa menggabungkan label pameran dan kartu kondisi untuk menyusun provenans parsial lukisan, sambil membedakan lokasi, pemberi pinjaman, kepemilikan, dan celah dokumen.",
        },
        {
          isCorrect: false,
          label:
            "Siswa memakai label 1974 sebagai bukti bahwa Galeri Pesisir memiliki lukisan dan bahwa setiap perpindahan sebelumnya sudah tercatat.",
        },
        {
          isCorrect: false,
          label:
            "Siswa menganggap kartu kondisi 1967 sebagai akta pemindahan hak milik karena kartu itu mencantumkan lokasi lukisan.",
        },
        {
          isCorrect: false,
          label:
            "Siswa memilih sumber tahun 1975 sebagai riwayat paling lengkap karena tanggal yang lebih baru selalu mencakup seluruh peristiwa sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Siswa mengisi rentang 1958 sampai 1967 dengan jalur perpindahan yang paling masuk akal karena lokasi awal dan akhirnya sudah diketahui.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
