import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "mini-bank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "semua siswa di sekolah itu sudah membuka tabungan",
        },
        { correct: false, label: "uang saku siswa naik pada akhir semester" },
        {
          correct: true,
          label:
            "jumlah penabung meningkat, tetapi kebiasaan menabung belum teratur sepanjang semester",
        },
        {
          correct: false,
          label: "karyawisata dibatalkan agar siswa dapat menabung",
        },
        { correct: false, label: "jumlah penabung turun pada tahun kedua" },
      ],
    },
  },
};

export default item;
