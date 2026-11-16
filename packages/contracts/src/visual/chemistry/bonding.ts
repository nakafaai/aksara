import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `AlkaliWaterLab`: a 600 mL beaker of water with a few drops of
 * phenolphthalein on a white tile, at its real size on a lab bench, and a
 * pea-sized piece of metal dropped in.
 */
function alkaliWaterLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        choose: TextSchema,
        density: rich,
        equation: rich,
        ionization: rich,
        melting: rich,
        radius: rich,
        view: TextSchema,
      }),
      metals: Schema.Array(
        Schema.Literals([
          "lithium",
          "sodium",
          "potassium",
          "magnesium",
          "calcium",
        ])
      ),
    })
  );
}

/** Props of `IonLatticeLab`: a rock-salt crystal at real size. */
function ionLatticeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      crystals: Schema.Array(
        Schema.Literals([
          "sodium-chloride",
          "magnesium-oxide",
          "lithium-fluoride",
          "potassium-chloride",
          "sodium-fluoride",
          "sodium-bromide",
        ])
      ),
      labels: Schema.Struct({
        cells: TextSchema,
        choose: TextSchema,
        count: rich,
        formula: rich,
        ions: rich,
        lattice: rich,
        view: TextSchema,
      }),
    })
  );
}

/**
 * Props of `IonFormationLab`: two atoms become two ions: the metal's outer
 * electrons cross to the nonmetal's outer shell.
 */
function ionFormationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        choose: TextSchema,
        metalRadius: rich,
        metalShells: rich,
        nonmetalRadius: rich,
        nonmetalShells: rich,
        progress: TextSchema,
        view: TextSchema,
      }),
      pairs: Schema.Array(
        Schema.Literals([
          "sodium-chlorine",
          "magnesium-oxygen",
          "lithium-fluorine",
          "potassium-chlorine",
        ])
      ),
    })
  );
}

/** Props of `MoleculeShapeLab`: a molecule lab. */
function moleculeShapeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        atoms: rich,
        choose: TextSchema,
        fill: rich,
        formula: rich,
        mass: rich,
        shape: rich,
        view: TextSchema,
      }),
      molecules: Schema.Array(
        Schema.Struct({
          id: Schema.Literals([
            "hydrogen",
            "oxygen",
            "nitrogen",
            "chlorine",
            "hydrogen-chloride",
            "carbon-monoxide",
            "nitrogen-monoxide",
            "water",
            "hydrogen-peroxide",
            "carbon-dioxide",
            "sulfur-dioxide",
            "nitrogen-dioxide",
            "dinitrogen-monoxide",
            "ozone",
            "sulfur-trioxide",
            "ammonia",
            "methane",
            "ethene",
            "ethane",
            "ethyne",
            "propane",
            "ethanol",
            "methanol",
            "hexane",
            "methylpentane-2",
            "methylpentane-3",
            "dimethylbutane-22",
            "dimethylbutane-23",
            "hexene",
            "dibromohexane",
            "propene",
            "propanol",
            "chloroethene",
          ]),
          name: TextSchema,
        })
      ),
    })
  );
}

/** Props of `OrbitalCloudLab`: an orbital lab. */
function orbitalCloudLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        angular: rich,
        choose: TextSchema,
        numbers: rich,
        orbital: rich,
        radial: rich,
        view: TextSchema,
      }),
      orbitals: Schema.Array(
        Schema.Literals(["1s", "2s", "2px", "2pz", "3s", "3pz", "3dz2", "3dxy"])
      ),
    })
  );
}

/**
 * The props of the labs of orbitals, ions, and bonds. No prop states the
 * conclusion a lab leads to, so none holds answer state.
 */
export function bondingVisuals<E>(rich: RichSlot<E>) {
  return {
    AlkaliWaterLab: alkaliWaterLab(rich),
    IonLatticeLab: ionLatticeLab(rich),
    IonFormationLab: ionFormationLab(rich),
    MoleculeShapeLab: moleculeShapeLab(rich),
    OrbitalCloudLab: orbitalCloudLab(rich),
  };
}
