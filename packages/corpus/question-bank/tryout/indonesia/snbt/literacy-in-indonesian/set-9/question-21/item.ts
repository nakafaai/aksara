import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Laras berubah dari takut pada hasil buram menjadi yakin bahwa semua karya yang tidak lengkap pasti lebih jujur daripada karya yang rapi.",
        },
        {
          isCorrect: false,
          label:
            "Laras berubah karena penyunting menyetujui bingkai kosong, sehingga tanggung jawab atas isi esai beralih kepada penyunting.",
        },
        {
          isCorrect: false,
          label:
            "Laras mengatasi keterbatasan dengan mengganti seluruh foto menjadi rekaman suara agar tugas lima penanda tetap dianggap lengkap.",
        },
        {
          isCorrect: true,
          label:
            "Laras beralih dari mengejar kesan lengkap menuju penyajian pengalaman yang dapat dipertanggungjawabkan, termasuk bagian yang tidak berhasil ia capai.",
        },
        {
          isCorrect: false,
          label:
            "Laras menyimpulkan bahwa batas waktu dan baterai tidak penting selama sebuah karya memiliki keterangan yang menjelaskan kekurangannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
