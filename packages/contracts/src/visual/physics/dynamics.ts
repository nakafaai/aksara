import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `ConnectedBlocksLab`: two blocks joined by a light string are pulled across the floor from the front. */
function connectedBlocksLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      back: Schema.Finite,
      friction: Schema.Finite,
      front: Schema.Finite,
      labels: Schema.Struct({
        acceleration: rich,
        pull: rich,
        pullName: TextSchema,
        tension: rich,
        viewLabel: TextSchema,
      }),
      pull: Schema.Finite,
    })
  );
}

/** Props of `BulletBlockLab`: a bullet embeds in a wooden block resting on the floor, and the block slides to a stop. */
function bulletBlockLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      blockMass: Schema.Finite,
      bulletMass: Schema.Finite,
      friction: Schema.Finite,
      labels: Schema.Struct({
        deceleration: rich,
        distance: rich,
        lost: rich,
        velocity: rich,
        viewLabel: TextSchema,
      }),
      speed: Schema.Finite,
    })
  );
}

/** Props of `CliffThrowLab`: two balls leave a cliff edge above the sea: A thrown straight up, B dropped from rest a little later. */
function cliffThrowLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      delay: Schema.Finite,
      gravity: Schema.Finite,
      height: Schema.Finite,
      labels: Schema.Struct({
        first: rich,
        gap: rich,
        second: rich,
        viewLabel: TextSchema,
      }),
      speed: Schema.Finite,
    })
  );
}

/** Props of `InclineSlideLab`: a block released while moving up an inclined plane slides up and stops. */
function inclineSlideLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.Finite,
      friction: Schema.Finite,
      gravity: Schema.Finite,
      labels: Schema.Struct({
        along: rich,
        deceleration: rich,
        distance: rich,
        viewLabel: TextSchema,
      }),
      mass: Schema.Finite,
      speed: Schema.Finite,
    })
  );
}

/** Props of `LiftScaleLab`: a student stands on scales in a lift. */
function liftScaleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      gravity: Schema.Finite,
      labels: Schema.Struct({
        acceleration: rich,
        cases: byIds(
          ["upFaster", "upSlower", "downFaster", "downSlower"],
          rich
        ),
        motion: TextSchema,
        reading: rich,
        viewLabel: TextSchema,
      }),
      mass: Schema.Finite,
      reading: Schema.Finite,
    })
  );
}

/** Props of `RecoilLab`: a rifle fires a bullet. */
function recoilLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      bulletMass: Schema.Finite,
      labels: Schema.Struct({
        energy: rich,
        force: rich,
        momentum: rich,
        velocity: rich,
        viewLabel: TextSchema,
      }),
      rifleMass: Schema.Finite,
      speed: Schema.Finite,
      stop: Schema.Finite,
    })
  );
}

/** Props of `SpringChainLab`: spring P hangs from the ceiling and carries springs Q and R side by side, which carry the load. */
function springChainLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        load: rich,
        loadName: TextSchema,
        pair: rich,
        top: rich,
        total: rich,
        viewLabel: TextSchema,
      }),
      load: Schema.Finite,
      stiffness: Schema.Finite,
    })
  );
}

/**
 * The props of the forces and motion labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function dynamicsVisuals<E>(rich: RichSlot<E>) {
  return {
    ConnectedBlocksLab: connectedBlocksLab(rich),
    BulletBlockLab: bulletBlockLab(rich),
    CliffThrowLab: cliffThrowLab(rich),
    InclineSlideLab: inclineSlideLab(rich),
    LiftScaleLab: liftScaleLab(rich),
    RecoilLab: recoilLab(rich),
    SpringChainLab: springChainLab(rich),
  };
}
