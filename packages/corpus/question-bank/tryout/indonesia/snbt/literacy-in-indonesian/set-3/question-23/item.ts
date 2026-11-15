import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf itu mengakui manfaat rel bagi pedagang kecil dan buruh, paragraf itu membatalkan kesimpulan tentang siapa yang paling diuntungkan, dan manfaat itu digambarkan bukan sebagai tujuan utama.",
        },
        {
          correct: false,
          label:
            "Paragraf itu mengakui manfaat rel bagi pemilik perkebunan, paragraf itu tidak membatalkan kesimpulan tentang siapa yang paling diuntungkan, dan manfaat itu digambarkan bukan sebagai tujuan utama.",
        },
        {
          correct: false,
          label:
            "Paragraf itu membantah sebutan awal modernisasi dalam buku pelajaran, paragraf itu tidak membatalkan kesimpulan tentang siapa yang paling diuntungkan, dan manfaat itu digambarkan bukan sebagai tujuan utama.",
        },
        {
          correct: true,
          label:
            "Paragraf itu mengakui manfaat rel bagi pedagang kecil dan buruh, paragraf itu tidak membatalkan kesimpulan tentang siapa yang paling diuntungkan, dan manfaat itu digambarkan bukan sebagai tujuan utama, tetapi tetap nyata.",
        },
        {
          correct: false,
          label:
            "Paragraf itu mengakui manfaat rel bagi pedagang kecil dan buruh, paragraf itu tidak membatalkan kesimpulan tentang siapa yang paling diuntungkan, dan manfaat itu digambarkan sudah direncanakan sejak awal.",
        },
      ],
    },
  },
};

export default item;
