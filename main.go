package main

import (
	"image/color"

	"github.com/hajimehoshi/ebiten"
)

func run(img *ebiten.Image) error {
	if ebiten.IsDrawingSkipped() {
		return nil
	}
	img.Fill(color.RGBA{0, 128, 0, 255})
	return nil
}

func main() {
	w, h := ebiten.ScreenSizeInFullscreen()
	ebiten.SetCursorVisibility(true)
	ebiten.SetRunnableInBackground(true)
	fac := ebiten.DeviceScaleFactor()
	ebiten.Run(run, int(float64(w)*fac), int(float64(h)*fac), 1/fac, "Path")
}
