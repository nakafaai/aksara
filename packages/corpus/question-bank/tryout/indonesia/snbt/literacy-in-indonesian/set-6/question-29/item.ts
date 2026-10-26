import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Sudut pandang terbatas membuat pembaca menilai keputusan dari bukti yang Reno lihat, sambil menahan kepastian tentang niat supervisor dan penyebab garis pada lukisan.",
        },
        {
          correct: false,
          label:
            "Istilah *sudut pandang terbatas* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *sudut pandang terbatas* dengan benda yang berulang, bukan dengan sifat penutup cerita.",
        },
        {
          correct: false,
          label:
            "Penyebutan *sudut pandang terbatas* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menerangkan latar sehingga tindakan tokoh dan perubahan makna benda tidak relevan.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
