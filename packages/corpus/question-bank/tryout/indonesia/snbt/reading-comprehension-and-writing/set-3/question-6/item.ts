import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "stingless-bees",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "memaparkan cara warga Dusun Sumberwangi beternak lebah klanceng beserta manfaatnya",
        },
        {
          correct: false,
          label:
            "membujuk pembaca agar membeli madu klanceng dari Dusun Sumberwangi",
        },
        {
          correct: false,
          label:
            "membandingkan rasa madu klanceng dengan rasa madu lebah biasa",
        },
        {
          correct: false,
          label:
            "mengkritik petani kopi yang tidak memelihara lebah di kebunnya",
        },
        {
          correct: false,
          label: "menjelaskan cara membuat kotak kayu untuk sarang lebah",
        },
      ],
    },
  },
};

export default item;
