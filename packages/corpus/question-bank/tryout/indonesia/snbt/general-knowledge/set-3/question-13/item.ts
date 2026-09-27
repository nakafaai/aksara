import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "kata yang ejaan dan urutannya harus sama persis dalam dua bahasa",
        },
        {
          isCorrect: false,
          label:
            "ringkasan yang menghapus tingkat bahaya dan tindakan yang diminta",
        },
        {
          isCorrect: false,
          label: "peringatan tambahan yang tidak terdapat dalam pesan sumber",
        },
        {
          isCorrect: true,
          label:
            "ungkapan dalam bahasa sasaran yang membawa fungsi makna yang sebanding",
        },
        {
          isCorrect: false,
          label: "panduan pelafalan tanpa pemindahan fungsi makna",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
