import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kata yang ejaan dan urutannya harus sama persis dalam dua bahasa",
        },
        {
          correct: false,
          label:
            "ringkasan yang menghapus tingkat bahaya dan tindakan yang diminta",
        },
        {
          correct: false,
          label: "peringatan tambahan yang tidak terdapat dalam pesan sumber",
        },
        {
          correct: true,
          label:
            "ungkapan dalam bahasa sasaran yang membawa fungsi makna yang sebanding",
        },
        {
          correct: false,
          label: "panduan pelafalan tanpa pemindahan fungsi makna",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
