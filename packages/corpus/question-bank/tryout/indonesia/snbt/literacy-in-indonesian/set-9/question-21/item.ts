import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-5",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laras berubah dari takut pada hasil buram menjadi yakin bahwa semua karya yang tidak lengkap pasti lebih jujur daripada karya yang rapi.",
        },
        {
          correct: false,
          label:
            "Laras berubah karena penyunting menyetujui bingkai kosong, sehingga tanggung jawab atas isi esai beralih kepada penyunting.",
        },
        {
          correct: false,
          label:
            "Laras mengatasi keterbatasan dengan mengganti seluruh foto menjadi rekaman suara agar tugas lima penanda tetap dianggap lengkap.",
        },
        {
          correct: true,
          label:
            "Laras beralih dari mengejar kesan lengkap menuju penyajian pengalaman yang dapat dipertanggungjawabkan, termasuk bagian yang tidak berhasil ia capai.",
        },
        {
          correct: false,
          label:
            "Laras menyimpulkan bahwa batas waktu dan baterai tidak penting selama sebuah karya memiliki keterangan yang menjelaskan kekurangannya.",
        },
      ],
    },
  },
};

export default item;
