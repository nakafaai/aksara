import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "flaw",
  },
  stimulus: "surya",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia tidak memperhitungkan kemungkinan bahwa angka 2024 di kelima desa sedang tinggi secara kebetulan sehingga akan turun dengan sendirinya.",
        },
        {
          correct: false,
          label:
            "Ia menyatakan penurunan dalam persentase, padahal banyaknya pencurian pada 2024 di kedua puluh desa itu tidak sama dengan di kelima desa.",
        },
        {
          correct: false,
          label:
            "Ia hanya memperkirakan pencurian pada malam hari, padahal pencurian sepeda motor juga terjadi pada siang hari.",
        },
        {
          correct: false,
          label:
            "Ia tidak menyebutkan berapa biaya yang dibutuhkan untuk memasang lampu di kedua puluh desa itu.",
        },
        {
          correct: true,
          label:
            "Ia mengambil angka $$60\\%$$ hanya dari desa yang lampunya berfungsi baik, padahal di tiga dari delapan desa penerima lampu banyak lampu padam lewat tengah malam.",
        },
      ],
    },
  },
};

export default item;
