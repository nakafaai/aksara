import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "parallel-reasoning",
  },
  stimulus: "kopi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua anggota paduan suara sekolah hadir pada latihan hari Sabtu. Sinta anggota paduan suara, jadi Sinta hadir pada latihan itu.",
        },
        {
          correct: true,
          label:
            "Semua pemain inti tim basket kota bertinggi badan di atas $$180$$ cm. Raka bertinggi $$185$$ cm, jadi Raka pasti menjadi pemain inti.",
        },
        {
          correct: false,
          label:
            "Jika hujan turun, lapangan menjadi basah. Lapangan tidak basah, jadi hujan tidak turun.",
        },
        {
          correct: false,
          label:
            "Tiga teman Dodi menyukai film itu, jadi Dodi yakin semua penonton pasti menyukainya.",
        },
        {
          correct: false,
          label:
            "Bu Tini memilih jalan memutar karena seorang tetangga mengatakan jalan utama sedang macet.",
        },
      ],
    },
  },
};

export default item;
