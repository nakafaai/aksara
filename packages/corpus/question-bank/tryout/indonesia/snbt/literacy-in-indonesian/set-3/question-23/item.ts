import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membantah kesimpulan paragraf sebelumnya, sehingga penulis akhirnya menyebut rel sebagai alat modernisasi bagi seluruh penduduk",
        },
        {
          correct: false,
          label:
            "menambah bukti bahwa keuntungan terbesar jatuh ke pemilik perkebunan, karena pasar baru melayani perkebunan",
        },
        {
          correct: false,
          label:
            "menjelaskan mengapa perusahaan swasta, bukan pemerintah, yang membangun jalur pertama",
        },
        {
          correct: true,
          label:
            "mengakui manfaat rel bagi sebagian penduduk agar penilaian penulis tidak berat sebelah, tanpa membatalkan kesimpulan tentang siapa yang paling diuntungkan",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa manfaat bagi penumpang adalah tujuan utama yang sejak awal direncanakan perusahaan kereta api swasta itu",
        },
      ],
    },
  },
};

export default item;
