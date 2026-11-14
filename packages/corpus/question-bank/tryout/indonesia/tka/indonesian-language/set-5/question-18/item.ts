import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "old-letter",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Wulan membuka amplop itu di bawah meja." },
        {
          correct: true,
          label:
            "Wulan dapat menjawab soal tentang negara yang berbatasan dengan Swiss, yang membuat banyak peserta lain ragu.",
        },
        {
          correct: false,
          label:
            "Wulan sudah tiga malam menghafal daftar ibu kota dari ponsel.",
        },
        { correct: false, label: "Bu Rina menatap Wulan dengan heran." },
        {
          correct: false,
          label: "Tanggal di sudut amplop menunjukkan tahun 1987.",
        },
      ],
    },
  },
};

export default item;
