import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nicht entfernte Plaque kann zu Zahnstein verhärten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Zahnstein unterhalb des Zahnfleischrandes kann das Zahnfleisch reizen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Rotes, geschwollenes oder blutendes Zahnfleisch kann auf Gingivitis hinweisen.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Jede Zahnfleischschwellung wird ausschließlich durch Plaque oder Zahnstein verursacht.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bereits gebildeter Zahnstein muss von einer zahnmedizinischen Fachkraft entfernt werden.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Plaque that is not removed can harden into tartar.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tartar below the gumline can irritate the gums.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Red, swollen, or bleeding gums can be signs of gingivitis.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Every case of swollen gums is caused only by plaque or tartar.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A dental professional must remove tartar after it has formed.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Plak yang tidak dibersihkan dapat mengeras menjadi karang gigi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Karang gigi di bawah garis gusi dapat mengiritasi gusi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Gusi merah, bengkak, atau berdarah dapat menjadi tanda gingivitis.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Setiap kasus gusi bengkak hanya disebabkan oleh plak atau karang gigi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tenaga kesehatan gigi harus membersihkan karang gigi yang sudah terbentuk.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
