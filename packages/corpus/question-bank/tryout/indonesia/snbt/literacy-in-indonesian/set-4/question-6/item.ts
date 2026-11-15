import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "village-midwife",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "surat rujukan baru berlaku setelah pihak rumah sakit di kota menyetujui dan membuka pintu bagi Sumi",
        },
        {
          correct: false,
          label:
            "Nia harus belajar membuka pintu poskesdes sendiri, karena Bu Warsih tidak akan selalu ada di sana",
        },
        {
          correct: false,
          label:
            "surat itu disimpan di laci yang terkunci, sehingga hanya Bu Warsih yang dapat mengeluarkannya",
        },
        {
          correct: true,
          label:
            "surat rujukan hanya sarana, sedangkan keputusan untuk berangkat harus datang dari keluarga Sumi sendiri",
        },
        {
          correct: false,
          label:
            "Bu Warsih belum yakin bahwa Sumi perlu dirujuk, sehingga surat itu baru disiapkan untuk berjaga-jaga",
        },
      ],
    },
  },
};

export default item;
