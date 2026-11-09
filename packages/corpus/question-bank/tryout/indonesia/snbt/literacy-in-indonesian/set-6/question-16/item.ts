import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Siswa menggabungkan label pameran dan kartu kondisi untuk menyusun provenans parsial lukisan, sambil membedakan lokasi, pemberi pinjaman, kepemilikan, dan celah dokumen.",
        },
        {
          correct: false,
          label:
            "Siswa memakai label $$1974$$ sebagai bukti bahwa Galeri Pesisir memiliki lukisan dan bahwa setiap perpindahan sebelumnya sudah tercatat.",
        },
        {
          correct: false,
          label:
            "Siswa menganggap kartu kondisi $$1967$$ sebagai akta pemindahan hak milik karena kartu itu mencantumkan lokasi lukisan.",
        },
        {
          correct: false,
          label:
            "Siswa memilih sumber tahun $$1975$$ sebagai riwayat paling lengkap karena tanggal yang lebih baru selalu mencakup seluruh peristiwa sebelumnya.",
        },
        {
          correct: false,
          label:
            "Siswa mengisi rentang $$1958$$ sampai $$1967$$ dengan jalur perpindahan yang paling masuk akal karena lokasi awal dan akhirnya sudah diketahui.",
        },
      ],
    },
  },
};

export default item;
