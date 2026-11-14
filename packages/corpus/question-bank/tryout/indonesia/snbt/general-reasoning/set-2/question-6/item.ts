import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "bakau",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sebagian besar garis pantai utara kabupaten itu berada di luar keempat desa, sehingga data keempat desa hanya mewakili sebagian kecil pesisir.",
        },
        {
          correct: true,
          label:
            "Sejak 2023, sekitar $$3$$ km pantai di dekat pelabuhan baru, di luar keempat desa, mundur $$4$$ m per tahun lebih cepat daripada sebelumnya karena pemecah gelombangnya menahan pasir.",
        },
        {
          correct: false,
          label:
            "Sejak 2023, sekitar $$40$$ km pantai lain di luar keempat desa mundur rata-rata $$0{,}1$$ m per tahun lebih cepat daripada sebelumnya karena musim angin barat makin panjang.",
        },
        {
          correct: false,
          label:
            "Bibit di Karangsari dan Lontar banyak yang mati sehingga laju mundur pantai di kedua desa itu hampir tidak berubah.",
        },
        {
          correct: false,
          label:
            "Keempat desa itu dipilih untuk penanaman karena sebelum 2022 pantainya mundur paling cepat dibandingkan desa lain di kabupaten itu.",
        },
      ],
    },
  },
};

export default item;
