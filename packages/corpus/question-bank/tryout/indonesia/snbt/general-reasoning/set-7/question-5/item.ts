import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Budi hat in diesem Monat nicht jede planmäßige Trainingseinheit absolviert.",
        },
        { isCorrect: false, label: "Budi mag keine Radrennen." },
        {
          isCorrect: false,
          label: "Budi kann niemals ein Radrennen gewinnen.",
        },
        {
          isCorrect: false,
          label: "Budi hat in diesem Monat überhaupt nicht trainiert.",
        },
        {
          isCorrect: false,
          label: "Budi ist von allen Langstreckenradrennen ausgeschlossen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Budi did not complete every scheduled practice session this month.",
        },
        { isCorrect: false, label: "Budi does not like bicycle racing." },
        { isCorrect: false, label: "Budi can never win a bicycle race." },
        {
          isCorrect: false,
          label: "Budi did not practice cycling at all this month.",
        },
        {
          isCorrect: false,
          label: "Budi is barred from every long-distance bicycle race.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Budi tidak menyelesaikan setiap sesi latihan yang dijadwalkan bulan ini.",
        },
        { isCorrect: false, label: "Budi tidak menyukai balap sepeda." },
        {
          isCorrect: false,
          label: "Budi tidak akan pernah bisa menang balap sepeda.",
        },
        {
          isCorrect: false,
          label: "Budi sama sekali tidak berlatih sepeda bulan ini.",
        },
        {
          isCorrect: false,
          label: "Budi dilarang mengikuti semua balap sepeda jarak jauh.",
        },
      ],
    },
  },
};

export default item;
