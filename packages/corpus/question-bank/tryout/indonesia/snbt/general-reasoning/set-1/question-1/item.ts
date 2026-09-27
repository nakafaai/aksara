import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aksesi mangga telah ditanam di Cukurgondang sejak Januari $$1941$$, dan luas kebunnya $$11{,}87$$ hektare.",
        },
        {
          isCorrect: false,
          label:
            "Pekan Inovasi Mangga Nasional diselenggarakan di IP2TP Cukurgondang, Pasuruan, Jawa Timur.",
        },
        {
          isCorrect: false,
          label:
            "Kementerian menyebut Cukurgondang sebagai kebun koleksi mangga terbesar kedua di dunia.",
        },
        {
          isCorrect: true,
          label:
            "Perkebunan rakyat di Pasuruan membudidayakan setiap aksesi dalam koleksi Cukurgondang.",
        },
        {
          isCorrect: false,
          label:
            "Kegiatan tersebut menjadi sarana untuk menyebarluaskan penelitian dan teknologi mangga.",
        },
      ],
    },
  },
};

export default item;
