## tailwind/minify: minify
.PHONY: tailwind/minify
tailwind/minify:
	tailwindcss -i ./src/assets/input.css -o ./src/assets/output.css
	tailwindcss -i ./src/assets/input.css -o ./src/assets/output.css --minify

## tailwind/watch: live
.PHONY: tailwind/live
tailwind/live:
	tailwindcss -i ./src/assets/input.css -o ./src/assets/output.css --watch