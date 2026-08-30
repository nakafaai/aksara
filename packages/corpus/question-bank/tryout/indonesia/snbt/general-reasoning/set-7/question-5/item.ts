import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Budi hat in diesem Monat nicht jede planmäßige Trainingseinheit absolviert.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Budi mag keine Radrennen." }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Budi kann niemals ein Radrennen gewinnen." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Budi hat in diesem Monat überhaupt nicht trainiert.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Budi ist von allen Langstreckenradrennen ausgeschlossen.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Budi did not complete every scheduled practice session this month.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Budi does not like bicycle racing." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Budi can never win a bicycle race." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Budi did not practice cycling at all this month.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Budi is barred from every long-distance bicycle race.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Budi tidak menyelesaikan setiap sesi latihan yang dijadwalkan bulan ini.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Budi tidak menyukai balap sepeda." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Budi tidak akan pernah bisa menang balap sepeda.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Budi sama sekali tidak berlatih sepeda bulan ini.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Budi dilarang mengikuti semua balap sepeda jarak jauh.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
