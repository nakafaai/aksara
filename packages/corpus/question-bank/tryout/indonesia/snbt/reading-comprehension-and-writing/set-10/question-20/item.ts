import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "running-club",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah anggota yang ikut latihan selalu naik sejak bulan Januari.",
        },
        {
          correct: false,
          label: "Anggota yang menghadapi ujian sekolah berlari lebih lambat.",
        },
        {
          correct: true,
          label:
            "Rata-rata waktu anggota terus membaik selama latihan rutin, meskipun jumlah anggota yang ikut latihan sempat berkurang pada bulan April.",
        },
        {
          correct: false,
          label: "Klub itu pasti menang dalam lomba lari tingkat provinsi.",
        },
        {
          correct: false,
          label: "Rata-rata waktu anggota tidak berubah sejak bulan Januari.",
        },
      ],
    },
  },
};

export default item;
