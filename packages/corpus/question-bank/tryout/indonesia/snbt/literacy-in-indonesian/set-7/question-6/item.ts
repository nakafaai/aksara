import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "walkable-city",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kemacetan kota paling tepat diatasi dengan melebarkan jalan secara bertahap.",
        },
        {
          correct: false,
          label:
            "Ojek sebaiknya dilarang agar warga terbiasa berjalan kaki untuk jarak dekat.",
        },
        {
          correct: true,
          label:
            "Kota perlu mengutamakan trotoar, bukan mengorbankannya demi jalan lebar.",
        },
        {
          correct: false,
          label:
            "Kendaraan pribadi sebaiknya dilarang masuk ke pusat kota sepanjang hari.",
        },
        {
          correct: false,
          label:
            "Trotoar mungkin hanya cocok dibangun di kota yang penduduknya sedikit.",
        },
      ],
    },
  },
};

export default item;
