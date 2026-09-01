import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Simulasi menetapkan bahwa mangrove nyata menyimpan lima unit karbon per tahun karena semua aliran penting sudah tercantum pada tabel.",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan hasil perhitungan menunjukkan bahwa salah satu siswa salah memahami operasi pengurangan, bukan berbeda dalam menentukan komponen yang dihitung.",
        },
        {
          isCorrect: true,
          label:
            "Simulasi menunjukkan bahwa hasil neraca karbon bergantung pada batas sistem dan kelengkapan aliran, tetapi angkanya belum dapat diperlakukan sebagai data mangrove nyata.",
        },
        {
          isCorrect: false,
          label:
            "Karena serasah tetap berada di ekosistem, perpindahan tumbuhan ke tanah tidak perlu dihitung dalam batas sistem apa pun.",
        },
        {
          isCorrect: false,
          label:
            "Kegunaan utama model adalah mengganti pengukuran pasang dan emisi metana dengan kartu yang lebih mudah dihitung.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
