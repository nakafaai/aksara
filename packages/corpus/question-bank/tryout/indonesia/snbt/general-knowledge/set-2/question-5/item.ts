import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Keine Fledermaus kann vom Boden starten." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fledermäuse müssen ihre Krallen mit ständiger Muskelarbeit um eine Sitzfläche geschlossen halten.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Eine hängende Fledermaus kann ihren Griff lösen und sich für den Abflug in den freien Luftraum fallen lassen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Jede Fledermausart zeigt genau dasselbe Ruhe- und Startverhalten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein kopfüber hängendes Quartier garantiert, dass kein Raubtier eine Fledermaus erreichen kann.",
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
            { kind: "text", text: "No bat can take off from the ground." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bats must use continuous muscular effort to keep their claws closed around a perch.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "A bat hanging from a roost can release its grip and drop into open air to begin flying.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every bat species uses exactly the same roosting and takeoff behavior.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "An upside-down roost guarantees that no predator can reach a bat.",
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
              text: "Tidak ada kelelawar yang dapat lepas landas dari tanah.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kelelawar harus terus memakai tenaga otot agar cakarnya mencengkeram tempat bertengger.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kelelawar yang bergantung dapat melepaskan cengkeraman dan menjatuhkan diri ke ruang terbuka untuk mulai terbang.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap spesies kelelawar memiliki cara bertengger dan lepas landas yang sama persis.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Posisi bertengger terbalik menjamin bahwa tidak ada predator yang dapat menjangkau kelelawar.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
