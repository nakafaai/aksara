import { defineLessonMaterial } from "#corpus/material/schema";

export const lessonMathematicsLinearEquationInequalityMaterial =
  defineLessonMaterial({
    assetRoot: "material/lesson/mathematics/linear-equation-inequality",
    domain: "mathematics",
    key: "lesson.mathematics.linear-equation-inequality",
    kind: "lesson",
    routeSlugs: {
      de: "lineare-gleichungs-und-ungleichungssysteme",
      en: "linear-equation-inequality",
      id: "sistem-persamaan-dan-pertidaksamaan-linear",
    },
    sections: [
      {
        routeSlugs: {
          de: "lineare-gleichungssysteme",
          en: "system-linear-equation",
          id: "sistem-persamaan-linear",
        },
        slug: "system-linear-equation",
      },
      {
        routeSlugs: {
          de: "lineare-ungleichungssysteme",
          en: "system-linear-inequality",
          id: "sistem-pertidaksamaan-linear",
        },
        slug: "system-linear-inequality",
      },
    ],
    slug: "linear-equation-inequality",
    translations: {
      de: {
        description: "Löse lineare Systeme durch Einsetzen und Addieren.",
        title: "Lineare Gleichungs- und Ungleichungssysteme",
      },
      en: {
        description: "Solve linear systems with substitution and elimination.",
        title: "Systems of Linear Equations and Inequalities",
      },
      id: {
        description: "Selesaikan sistem linear dengan dua cara utama.",
        title: "Sistem Persamaan dan Pertidaksamaan Linear",
      },
    },
  });
