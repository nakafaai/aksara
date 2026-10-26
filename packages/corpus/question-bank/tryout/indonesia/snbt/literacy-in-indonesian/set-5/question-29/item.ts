import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *konflik* memastikan satu kelanjutan cerita sehingga pembaca tidak lagi perlu menafsirkan akhir.",
        },
        {
          correct: false,
          label:
            "Definisi itu menyamakan *konflik* dengan benda yang berulang, bukan dengan sifat penutup cerita.",
        },
        {
          correct: false,
          label:
            "Penyebutan *konflik* membuat kesan pribadi pembaca cukup meskipun bertentangan dengan rincian cerita.",
        },
        {
          correct: true,
          label:
            "Definisi *konflik* menjelaskan mengapa makna benang merah berkembang melalui pertentangan antara menyembunyikan kerusakan dan mempertahankan riwayat blus.",
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
