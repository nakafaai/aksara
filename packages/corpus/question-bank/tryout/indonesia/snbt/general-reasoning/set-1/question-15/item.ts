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
              text: "Jedes zugelassene pflanzliche Arzneimittel heilt nachweislich Krankheiten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Eine Verkehrszulassung garantiert, dass ein pflanzliches Arzneimittel für jede Person und jede Erkrankung geeignet ist.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Nach der Zulassung eines pflanzlichen Arzneimittels müssen Verbraucher die Kennzeichnung nicht mehr prüfen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die staatliche Überwachung endet, sobald ein pflanzliches Arzneimittel zugelassen wurde.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Vertrieb und Anwendung pflanzlicher Arzneimittel hängen von behördlicher Prüfung und fortlaufender Überwachung ab.",
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
              text: "Every authorized herbal product is proven to cure disease.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "A marketing authorization guarantees that a herbal product is suitable for every person and condition.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Consumers no longer need to check the label once a herbal product has a marketing authorization.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Government supervision ends as soon as a herbal product receives a marketing authorization.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The circulation and use of herbal products depend on regulatory evaluation and continuing supervision.",
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
              text: "Setiap produk herbal berizin edar terbukti dapat menyembuhkan penyakit.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Izin edar menjamin bahwa suatu produk herbal cocok untuk setiap orang dan setiap kondisi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Konsumen tidak perlu lagi memeriksa label setelah suatu produk herbal memperoleh izin edar.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pengawasan pemerintah berakhir begitu suatu produk herbal memperoleh izin edar.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Peredaran dan penggunaan produk herbal bergantung pada penilaian regulator serta pengawasan yang berkelanjutan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
