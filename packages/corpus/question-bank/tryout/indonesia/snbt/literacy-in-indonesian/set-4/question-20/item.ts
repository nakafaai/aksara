import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "dengue-cases",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rp$$114{,}8$$ juta, sama dengan bagian setiap kecamatan lain",
        },
        {
          correct: false,
          label:
            "Rp$$65{,}6$$ juta, atau Rp$$820$$ per penduduk, sebanding dengan banyak penduduknya",
        },
        {
          correct: false,
          label:
            "Rp$$104$$ juta, atau Rp$$1{.}300$$ per penduduk, lebih kecil daripada bagian Kota Baru per penduduk",
        },
        {
          correct: true,
          label:
            "Rp$$104$$ juta, atau Rp$$1{.}300$$ per penduduk, lebih besar daripada bagian Kota Baru per penduduk",
        },
        {
          correct: false,
          label:
            "Rp$$130$$ juta, karena laju kasusnya $$130$$ per $$100{.}000$$ penduduk",
        },
      ],
    },
  },
};

export default item;
