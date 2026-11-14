import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "bimbel",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Siswa yang hadir langsung pada suatu sesi pasti memahami seluruh materi sesi itu.",
        },
        {
          correct: false,
          label:
            "Setiap siswa yang absen pada suatu sesi di bulan Februari menonton rekaman sesi itu.",
        },
        {
          correct: true,
          label:
            "Paling sedikit sebagian siswa yang absen dari sesi langsung pada Februari tidak memperoleh pemahaman yang setara dari rekamannya.",
        },
        {
          correct: false,
          label:
            "Pada Januari, tidak ada siswa yang absen karena gangguan sambungan internet.",
        },
        {
          correct: false,
          label:
            "Jika rekaman dihapus, rata-rata banyak siswa yang hadir per sesi akan kembali menjadi $$150$$ siswa.",
        },
      ],
    },
  },
};

export default item;
