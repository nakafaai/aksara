import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "No bat can take off from the ground.",
      value: false,
    },
    {
      label:
        "Bats must use continuous muscular effort to keep their claws closed around a perch.",
      value: false,
    },
    {
      label:
        "A bat hanging from a roost can release its grip and drop into open air to begin flying.",
      value: true,
    },
    {
      label:
        "Every bat species uses exactly the same roosting and takeoff behavior.",
      value: false,
    },
    {
      label:
        "An upside-down roost guarantees that no predator can reach a bat.",
      value: false,
    },
  ],
  id: [
    {
      label: "Tidak ada kelelawar yang dapat lepas landas dari tanah.",
      value: false,
    },
    {
      label:
        "Kelelawar harus terus memakai tenaga otot agar cakarnya mencengkeram tempat bertengger.",
      value: false,
    },
    {
      label:
        "Kelelawar yang bergantung dapat melepaskan cengkeraman dan menjatuhkan diri ke ruang terbuka untuk mulai terbang.",
      value: true,
    },
    {
      label:
        "Setiap spesies kelelawar memiliki cara bertengger dan lepas landas yang sama persis.",
      value: false,
    },
    {
      label:
        "Posisi bertengger terbalik menjamin bahwa tidak ada predator yang dapat menjangkau kelelawar.",
      value: false,
    },
  ],
};

export default choices;
