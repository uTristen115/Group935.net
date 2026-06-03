# Important Project Context

Living notes for Codex work on this repo starting with the current site-polish and Deadwave conversation. Update this file after meaningful changes so future sessions do not have to recover context from chat history.

## Collaboration Preferences

- The user does their own browser visual QA. Do not use browser visual checking unless explicitly asked.
- After app source changes, rebuild the app bundle, regenerate SEO/static pages, and run the build check.
- The static HTML pages reference the hashed app bundle. If `src/app.jsx` changes, run `build:app`, then `build:seo`, then `build:check` so pages do not point at a stale bundle.
- On this Windows setup, use:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run build:app
& 'C:\Program Files\nodejs\npm.cmd' run build:seo
& 'C:\Program Files\nodejs\npm.cmd' run build:check
```

## Current Site Direction

- The site is a static React app built from `src/app.jsx` into `dist/app.js` and a hashed `dist/app.*.js` bundle.
- The user prefers the actual app/tool experience over landing-page style explanation.
- Keep visual treatments consistent across archive file formats: maps, perks, weapons, and dossiers should use the same intel-sheet backing/font system where appropriate.

## Recent Perk And File Changes

- Perk list icons received GobbleGum-style glow, particle, and float treatment.
- Perk names sit above icons, centered, with flat text rather than bent text.
- Perk flow/glow colors are defined in `PERK_ICON_COLOR` in `src/app.jsx`.
- Perk detail pages use a large floating/glowing icon without the old box backing.
- Perk detail icon hover is a slight nudge only, not a zoom.
- `Machine File`, `Weapon File`, and character `Dossier` stat panels use the normalized `IntelSheet` treatment.
- Perk pages no longer show the origin-site section or open-origin button.
- Weapon detail pages no longer show origin/introduced rows or the bottom origin section.

## Deadwave Easter Egg State

- The user added a `Deadwave/` folder with the minigame files. It is not yet wired into routing.
- `Deadwave/` is a standalone static mini game. It should present as its own Deadwave-branded hidden file, not as direct Group 935 branding:
  - Use the text `DEADWAVE` in the game shell instead of `Images/Icons/Group935icon.png`; avoid boxed `DW` seals/marks.
  - Keep the header clean: no subtitle under the brand, no date/hidden-signal meta line, and no hidden-file overlay label.
  - Fonts loaded from `Fonts/laraz/LARAZ Regular.ttf` and `Fonts/saniretro/Saniretro.ttf`.
  - Top nav links should use static-file relative paths so they work both live and under `file://`: `../index.html`, `../maps/index.html`, `../perks/index.html`, and `./index.html`.
  - Top-right `Return to Archive` link and overlay `Return to Archive` secondary action both point to `../index.html`.
  - Canvas/game accent colors have been pulled toward the site gold/red/bone/muted palette.
- The current Easter egg first step is a meteor background event.
- Meteor source assets are in `Images/Icons`:
  - `115meteor.png`
  - `115meteor1.png`
  - `115meteor2.png`
  - `115meteor3.png`
  - `115meteorGreen.png`
- Optimized animation copies were generated and should be used by the app:
  - `115meteor-fast.png`
  - `115meteor1-fast.png`
  - `115meteor2-fast.png`
  - `115meteor3-fast.png`
  - `115meteorGreen-fast.png`
  - `115meteorGreen-signal.png` for the clickable green signal meteor; this is the lighter test/performance sprite.
- The green meteor opens a first-pass `Deadwave Signal` radio tuning dial.
- The radio opens `Deadwave/` in the same tab after the user successfully sets both frequencies.
- The radio popup uses `Images/Icons/radiouse.png` as the transparent shell and `Images/Icons/radiodial.png` as the spinning knob.
- The digital number uses `Fonts/enter-sansman/entsans.ttf`, registered as `EnterSansman` in `src/app.jsx`.
- The Deadwave radio currently expects a two-step set sequence:
  - First tune/set `93.5`.
  - Then tune/set encoded `11.5`; internally this is dial position `115.0` on the same `71.1-120.7` band.
- After a correct set, the radio briefly shows a code-accepted message and spins the dial once before continuing. For the first frequency, the display reads `code 1 of 2 accepted`.
- After the second successful set, `launchDeadwaveGame()` waits briefly, then navigates to `/Deadwave/`.
- The set button uses a small `radiodial.png` image and overlays `Set` text.
- The dial range is `71.1-120.7`. The wheel adjusts by one visible tenth for the active code format; dragging remains more granular.
- Fine-tuning buttons use `Images/Icons/radioleftbutton.png` and `Images/Icons/radiorightbutton.png`.
- Radio text and controls should use the site palette (`T.e115`, `T.bone`, `T.bloodH`) rather than neon signal green.
- Important radio art coordinates are based on the `radiouse.png` source dimensions of `1122x1402`:
  - Display cutout: `left 25.13%`, `top 37.23%`, `width 49.38%`, `height 11.70%`.
  - Dial cutout: `left 32.09%`, `top 63.69%`, `width 35.12%`.
- Keep the radio layer order as display/dial underneath, `radiouse.png` shell on top. The shell cutouts are transparent.
- Exception: the main spinning dial now sits above the radio shell so it is not clipped by the shell artwork.

## Meteor Implementation Notes

- Meteor logic lives in `src/app.jsx` around the `METEOR_SPRITE_POOL`, `METEOR_LANES`, `MeteorSky`, and `MeteorField` code.
- The first meteor should spawn within the first 10 seconds after page open.
- The first meteor is not forced to be green for live builds; sprite and lane selection are random from the normal pool.
- Later meteors spawn randomly every 30-60 seconds.
- Sprite selection and lane selection are random, avoiding immediate repeats where possible.
- Lanes are intentionally steep/diagonal. Avoid flat horizontal fly-bys.
- The green signal meteor must remain on a front layer so it stays clickable.
- Performance is sensitive. Keep only one meteor active at a time.
- Use optimized `*-fast.png` sprites, not the large originals, for animation.
- Keep animated meteor CSS compositor-friendly: transform/opacity only, no moving drop-shadow filters.
- If meteors still look laggy after these optimizations, the honest next options are canvas rendering, disabling the effect on weaker devices, or removing the effect.

## Current Build State

- Last app bundle after the meteor performance pass: `app.7cc8a78f9f30.js`.
- Last checks run successfully:
  - `npm run build:app`
  - `npm run build:seo`
  - `npm run build:check`

## Git/Workspace Notes

- The worktree has many generated static HTML changes after SEO regeneration.
- `Deadwave/` and the meteor images were user-added/untracked when this note was created.
- Do not revert unrelated user changes.
