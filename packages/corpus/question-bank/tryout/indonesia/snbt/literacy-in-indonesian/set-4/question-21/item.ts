import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pemerintah kolonial menyebarkan bacaan karena ingin ikut menentukan apa yang dibaca rakyat yang mulai melek huruf.",
        },
        {
          column: 2,
          label:
            "Jasa Balai Pustaka menyebarkan bacaan membuat perannya sebagai penyaring tidak perlu dipersoalkan lagi.",
        },
        {
          column: 1,
          label:
            "Wajah penyebar bacaan dan wajah penyaring sama-sama nyata, bukan salah satunya kedok bagi yang lain.",
        },
        {
          column: 2,
          label:
            "Balai Pustaka paling tepat dinilai dari naskah-naskah yang ditolaknya, karena di situlah wajah aslinya tampak.",
        },
        {
          column: 2,
          label:
            "Bacaan liar lebih bermutu daripada terbitan Balai Pustaka karena terbit tanpa pedoman pemerintah kolonial.",
        },
      ],
    },
  },
};

export default item;
