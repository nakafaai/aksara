import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Aksesi mangga telah ditanam di Cukurgondang sejak Januari $$1941$$, dan luas kebunnya $$11{,}87$$ hektare.",
        },
        {
          correct: false,
          label:
            "Pekan Inovasi Mangga Nasional diselenggarakan di IP2TP Cukurgondang, Pasuruan, Jawa Timur.",
        },
        {
          correct: false,
          label:
            "Kementerian menyebut Cukurgondang sebagai kebun koleksi mangga terbesar kedua di dunia.",
        },
        {
          correct: true,
          label:
            "Perkebunan rakyat di Pasuruan membudidayakan setiap aksesi dalam koleksi Cukurgondang.",
        },
        {
          correct: false,
          label:
            "Kegiatan tersebut menjadi sarana untuk menyebarluaskan penelitian dan teknologi mangga.",
        },
      ],
    },
  },
};

export default item;
