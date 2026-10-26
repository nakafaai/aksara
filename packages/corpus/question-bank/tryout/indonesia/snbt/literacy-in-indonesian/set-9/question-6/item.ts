import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Simulasi menetapkan bahwa mangrove nyata menyimpan lima unit karbon per tahun karena semua aliran penting sudah tercantum pada tabel.",
        },
        {
          correct: false,
          label:
            "Perbedaan hasil perhitungan menunjukkan bahwa salah satu siswa salah memahami operasi pengurangan, bukan berbeda dalam menentukan komponen yang dihitung.",
        },
        {
          correct: true,
          label:
            "Simulasi menunjukkan bahwa hasil neraca karbon bergantung pada batas sistem dan kelengkapan aliran, tetapi angkanya belum dapat diperlakukan sebagai data mangrove nyata.",
        },
        {
          correct: false,
          label:
            "Karena serasah tetap berada di ekosistem, perpindahan tumbuhan ke tanah tidak perlu dihitung dalam batas sistem apa pun.",
        },
        {
          correct: false,
          label:
            "Kegunaan utama model adalah mengganti pengukuran pasang dan emisi metana dengan kartu yang lebih mudah dihitung.",
        },
      ],
    },
  },
};

export default item;
