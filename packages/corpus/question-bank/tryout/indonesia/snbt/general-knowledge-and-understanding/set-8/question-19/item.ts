import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "gambut",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lahan gambut terbentuk dari sisa tumbuhan yang membusuk sempurna dalam waktu yang sangat singkat.",
        },
        {
          correct: false,
          label:
            "Asap kebakaran gambut hanya mengganggu penerbangan dan tidak berdampak pada kesehatan manusia.",
        },
        {
          correct: false,
          label:
            "Kebakaran gambut selalu dapat dipadamkan dengan cepat dan mudah apabila api di permukaan sudah tidak terlihat.",
        },
        {
          correct: false,
          label:
            "Sekat kanal tidak perlu dirawat karena sekali dibangun sekat itu akan menahan air selamanya.",
        },
        {
          correct: true,
          label:
            "Gambut yang dikeringkan mudah terbakar, sehingga menjaganya tetap basah menjadi pencegahan penting.",
        },
      ],
    },
  },
};

export default item;
