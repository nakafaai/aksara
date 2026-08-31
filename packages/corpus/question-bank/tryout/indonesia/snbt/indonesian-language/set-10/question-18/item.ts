import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Peta resmi menunjukkan lokasi pemasangan, sedangkan catatan harian memberi pengalaman tiga warga; keduanya dapat menghubungkan perubahan ruang dan pengalaman malam, tetapi tidak mewakili seluruh warga atau semua jalur.",
        },
        {
          isCorrect: false,
          label:
            "Peta lokasi lampu membuktikan pengalaman berjalan malam semua warga karena penerangan ditentukan sepenuhnya oleh jumlah lampu.",
        },
        {
          isCorrect: false,
          label:
            "Catatan harian harus menggantikan peta karena pengalaman pribadi lebih nyata daripada dokumen resmi.",
        },
        {
          isCorrect: false,
          label:
            "Jika catatan warga tidak sama, peta resmi menjadi satu-satunya sumber yang dapat digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Setelah lokasi dan pengalaman digabungkan, posisi warga serta tujuan kantor desa membuat peta tidak lagi perlu dicatat.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
