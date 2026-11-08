import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "lichen-air",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Survei lumut kerak membutuhkan biaya lebih besar daripada alat pengukur.",
        },
        {
          correct: false,
          label:
            "Lumut kerak tidak tumbuh di kota sehingga survei hanya dapat dilakukan di pedesaan.",
        },
        {
          correct: false,
          label:
            "Siswa dan warga tidak mampu membedakan bentuk-bentuk lumut kerak.",
        },
        {
          correct: false,
          label:
            "Lumut kerak hanya peka terhadap senyawa nitrogen, bukan sulfur dioksida.",
        },
        {
          correct: true,
          label:
            "Lumut kerak mencerminkan keadaan udara selama bertahun-tahun dan dipengaruhi faktor lain sehingga tidak menunjukkan kadar zat pencemar pada waktu tertentu.",
        },
      ],
    },
  },
};

export default item;
