import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *perkembangan tokoh* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *perkembangan tokoh* dengan benda yang berulang, bukan dengan sifat penutup cerita.",
        },
        {
          correct: true,
          label:
            "Definisi *perkembangan tokoh* memberi dasar untuk membandingkan tindakan Jati pada awal dan akhir, tanpa mensyaratkan bahwa ia harus memahami seluruh bacaan.",
        },
        {
          correct: false,
          label:
            "Penyebutan *perkembangan tokoh* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menerangkan latar sehingga tindakan tokoh dan perubahan makna benda tidak relevan.",
        },
      ],
    },
  },
};

export default item;
