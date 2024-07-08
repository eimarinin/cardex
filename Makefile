## tailwind/minify: minify
.PHONY: tailwind/minify
tailwind/minify:
	tailwindcss -i ./practica/src/assets/input.css -o ./practica/src/assets/output.css
	tailwindcss -i ./practica/src/assets/input.css -o ./practica/src/assets/output.css --minify

## tailwind/watch: live
.PHONY: tailwind/live
tailwind/live:
	tailwindcss -i ./practica/src/assets/input.css -o ./practica/src/assets/output.css --watch

