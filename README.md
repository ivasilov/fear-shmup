# Fear Shmup

Fear Shmup is/will be a SHMUP-style game where the player flies a damaged plane. The plane goes through several encounters
with enemy planes where all planes communicate between each other (with chat bubbles) to destroy the player. The player
should use the coordination info against them and survive the encounters. This game mechanic is inspired by the F.E.A.R.
 game, hence the name.

## Next steps

- Figure out line of sight algorithm
- Figure out how to render planes from https://kenney.itch.io/ship-mixer
- Figure out a way for the enemies to communicate between each other.
  - Decide whether there's a hearing distance.
  - Figure out how to render speech bubbles
- Try to write few types of enemies
  - Protector - doesn't shoot, only stands in front of other ships and takes the damage
  - Needle - small vulnerable ship which needs time to charge and commands other ships to protect him
  - Pincer - combo of two ship which tries to corner the player
  - Disruptor - destroy the user bullets/missiles
- Maybe use https://kenney.nl/assets/pixel-shmup for rendering a map with parallax effect (should be available in Excalibur soon)

